'use client';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { getOrdersByIds } from '@/domain/order/order.service';
import { useCart } from '@/stores/cart';
import { ArrowLeft, Clock, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';

const statusMap = {
  pending: { label: '주문 접수', color: 'bg-yellow-500/10 text-yellow-500' },
  preparing: { label: '준비 중', color: 'bg-blue-500/10 text-blue-500' },
  ready: { label: '준비 완료', color: 'bg-green-500/10 text-green-500' },
  served: { label: '제공 완료', color: 'bg-primary/10 text-primary' },
  cancelled: { label: '주문 취소', color: 'bg-destructive/10 text-destructive' },
};

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

export default function MyOrderPage() {
  const { placedOrderIds } = useCart();
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      if (placedOrderIds.length === 0) {
        setLoading(false);
        return;
      }

      try {
        const data = await getOrdersByIds(placedOrderIds);
        setOrders(data as unknown as Order[]);
      } catch (error) {
        console.error('Failed to fetch orders:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [placedOrderIds]);

  if (loading) {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-20">
        <Clock className="text-muted-foreground h-12 w-12 animate-pulse" />
        <p className="mt-4 font-medium">주문 내역을 불러오는 중입니다...</p>
      </div>
    );
  }

  if (placedOrderIds.length === 0) {
    return (
      <main className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
        <div className="bg-muted flex h-20 w-20 items-center justify-center rounded-full mb-6 mx-auto">
          <ShoppingBag className="text-muted-foreground h-10 w-10 opacity-20" />
        </div>
        <h1 className="text-2xl font-bold">주문 내역이 없습니다</h1>
        <p className="text-muted-foreground mt-2 font-medium">
          첫 주문을 시작해보세요!
        </p>
        <Button asChild className="mt-8 rounded-xl" size="lg">
          <Link href="/order">메뉴 보러가기</Link>
        </Button>
      </main>
    );
  }

  return (
    <main className="container mx-auto max-w-2xl px-4 py-10 md:px-6">
      <Link
        href="/order"
        className="text-muted-foreground hover:text-foreground mb-6 flex items-center gap-2 text-sm transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        메뉴판으로 돌아가기
      </Link>

      <h1 className="font-display text-4xl">내 주문</h1>
      <p className="text-muted-foreground mt-2">최근 주문하신 내역입니다.</p>

      <div className="mt-10 space-y-6">
        {orders.map((order) => (
          <Card
            key={order.id}
            className="overflow-hidden rounded-2xl border-none shadow-sm"
          >
            <Link
              href={`/order/status/${order.id}`}
              className="block p-6 transition-colors hover:bg-muted/30"
            >
              <div className="mb-4 flex items-center justify-between">
                <div className="flex flex-col gap-1">
                  <span className="font-mono text-xs uppercase text-muted-foreground">
                    Order #{order.id.split('-')[0]}
                  </span>
                  <span className="text-sm font-medium">
                    {new Date(order.created_at).toLocaleDateString('ko-KR')}{' '}
                    {new Date(order.created_at).toLocaleTimeString('ko-KR', {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </span>
                </div>
                <Badge
                  variant="outline"
                  className={
                    statusMap[order.status as keyof typeof statusMap]?.color
                  }
                >
                  {statusMap[order.status as keyof typeof statusMap]?.label ||
                    order.status}
                </Badge>
              </div>

              <div className="space-y-1">
                {order.order_items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      {item.menu_items?.name} x {item.quantity}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-4 flex items-center justify-between border-t pt-4">
                <span className="text-sm font-semibold text-muted-foreground">
                  총 결제 금액
                </span>
                <span className="text-lg font-bold text-primary">
                  ₩{order.total_price.toLocaleString()}
                </span>
              </div>
            </Link>
          </Card>
        ))}
      </div>
    </main>
  );
}
