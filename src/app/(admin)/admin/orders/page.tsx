'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { getRecentOrders, updateOrderStatus } from '@/domain/order/order.service';
import { supabase } from '@/lib/supabase';
import { RefreshCcw, ShoppingBag } from 'lucide-react';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

const statusMap = {
  pending: { label: '대기', color: 'bg-yellow-500/10 text-yellow-500' },
  preparing: { label: '준비중', color: 'bg-blue-500/10 text-blue-500' },
  ready: { label: '준비완료', color: 'bg-green-500/10 text-green-500' },
  served: { label: '제공완료', color: 'bg-primary/10 text-primary' },
  cancelled: { label: '취소됨', color: 'bg-destructive/10 text-destructive' },
};

type OrderStatus = keyof typeof statusMap;

interface OrderItem {
  id: string;
  quantity: number;
  menu_items: {
    name: string;
  } | null;
}

interface Order {
  id: string;
  created_at: string;
  status: string;
  total_price: number;
  order_items: OrderItem[];
}

export default function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchOrders = async (showLoading = true) => {
    try {
      if (showLoading) setLoading(true);
      const data = await getRecentOrders();
      setOrders(data as unknown as Order[]);
    } catch (error) {
      console.error('Failed to fetch orders:', error);
      toast.error('주문 목록을 불러오지 못했습니다.');
    } finally {
      if (showLoading) setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();

    const channel = supabase
      .channel('admin-orders-realtime')
      .on(
        'postgres_changes',
        { event: '*', schema: 'public', table: 'orders' },
        () => {
          // Re-fetch orders on any change to ensure we have joined data
          fetchOrders(false);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const handleStatusChange = async (orderId: string, newStatus: OrderStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      toast.success('주문 상태가 변경되었습니다.');
    } catch (error) {
      console.error('Failed to update status:', error);
      toast.error('상태 변경에 실패했습니다.');
    }
  };

  return (
    <div className="flex-1 space-y-4 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">주문 관리</h2>
        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => fetchOrders()}
            disabled={loading}
          >
            <RefreshCcw
              className={`mr-2 h-4 w-4 ${loading ? 'animate-spin' : ''}`}
            />
            새로고침
          </Button>
        </div>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-base font-medium">최근 주문 내역</CardTitle>
          <ShoppingBag className="text-muted-foreground h-4 w-4" />
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>시간</TableHead>
                <TableHead>주문번호</TableHead>
                <TableHead>메뉴</TableHead>
                <TableHead>금액</TableHead>
                <TableHead>상태</TableHead>
                <TableHead className="text-right">관리</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {orders.map((order) => (
                <TableRow key={order.id}>
                  <TableCell>
                    {new Date(order.created_at).toLocaleTimeString('ko-KR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </TableCell>
                  <TableCell className="font-mono text-xs uppercase">
                    {order.id.split('-')[0]}
                  </TableCell>
                  <TableCell>
                    <div className="flex flex-col gap-1">
                      {order.order_items.map((item: OrderItem) => (
                        <span key={item.id} className="text-sm">
                          {item.menu_items?.name} x {item.quantity}
                        </span>
                      ))}
                    </div>
                  </TableCell>
                  <TableCell>₩{order.total_price.toLocaleString()}</TableCell>
                  <TableCell>
                    <Badge
                      variant="outline"
                      className={
                        statusMap[order.status as OrderStatus]?.color || ''
                      }
                    >
                      {statusMap[order.status as OrderStatus]?.label ||
                        order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <Select
                      defaultValue={order.status}
                      onValueChange={(val) =>
                        handleStatusChange(order.id, val as OrderStatus)
                      }
                    >
                      <SelectTrigger className="ml-auto w-[110px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {Object.entries(statusMap).map(([key, { label }]) => (
                          <SelectItem key={key} value={key}>
                            {label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </TableCell>
                </TableRow>
              ))}
              {orders.length === 0 && !loading && (
                <TableRow>
                  <TableCell
                    colSpan={6}
                    className="py-10 text-center text-muted-foreground"
                  >
                    주문 내역이 없습니다.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
