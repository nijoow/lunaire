'use client';

import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { getOrderWithItems } from '@/domain/order/order.service';
import { supabase } from '@/lib/supabase';
import {
  ArrowLeft,
  CheckCircle2,
  Clock,
  Coffee,
  Package,
  XCircle,
} from 'lucide-react';
import Link from 'next/link';
import { use, useEffect, useState } from 'react';

const statusConfig = {
  pending: {
    label: '주문 접수됨',
    description: '주문이 정상적으로 접수되었습니다. 곧 준비를 시작합니다.',
    icon: Clock,
    color: 'text-yellow-500',
    bg: 'bg-yellow-500/10',
  },
  preparing: {
    label: '메뉴 준비 중',
    description: '바리스타가 정성껏 메뉴를 준비하고 있습니다.',
    icon: Coffee,
    color: 'text-blue-500',
    bg: 'bg-blue-500/10',
  },
  ready: {
    label: '준비 완료',
    description: '메뉴가 준비되었습니다! 카운터에서 확인해 주세요.',
    icon: Package,
    color: 'text-green-500',
    bg: 'bg-green-500/10',
  },
  served: {
    label: '제공 완료',
    description: '맛있게 드세요! 이용해 주셔서 감사합니다.',
    icon: CheckCircle2,
    color: 'text-primary',
    bg: 'bg-primary/10',
  },
  cancelled: {
    label: '주문 취소됨',
    description: '주문이 취소되었습니다. 문의 사항은 카운터로 부탁드립니다.',
    icon: XCircle,
    color: 'text-destructive',
    bg: 'bg-destructive/10',
  },
};

interface Props {
  params: Promise<{ id: string }>;
}

interface OrderItem {
  id: string;
  price: number;
  quantity: number;
  menu_items: {
    name: string;
  };
}

interface Order {
  id: string;
  status: string;
  created_at: string;
  total_price: number;
  order_items: OrderItem[];
}

export default function OrderStatusPage({ params }: Props) {
  const { id } = use(params);
  const [order, setOrder] = useState<Order | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const data = await getOrderWithItems(id);
        setOrder(data as unknown as Order);
      } catch (err) {
        console.error('Failed to fetch order:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchOrder();
  }, [id]);

  useEffect(() => {
    const channel = supabase
      .channel(`order-status-${id}`)
      .on(
        'postgres_changes',
        {
          event: 'UPDATE',
          schema: 'public',
          table: 'orders',
          filter: `id=eq.${id}`,
        },
        (payload) => {
          setOrder((currentOrder) => {
            if (!currentOrder) return null;
            return {
              ...currentOrder,
              status: payload.new.status,
            };
          });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-20">
        <Clock className="text-muted-foreground h-12 w-12 animate-pulse" />
        <p className="mt-4 font-medium">주문 정보를 불러오는 중입니다...</p>
      </div>
    );
  }

  if (!order) {
    return (
      <div className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
        <XCircle className="text-destructive h-12 w-12 opacity-20" />
        <h1 className="mt-6 text-2xl font-bold">주문을 찾을 수 없습니다</h1>
        <Button asChild className="mt-8 rounded-xl">
          <Link href="/order">돌아가기</Link>
        </Button>
      </div>
    );
  }

  const {
    label,
    description,
    icon: StatusIcon,
    color,
    bg,
  } = statusConfig[order.status as keyof typeof statusConfig];

  return (
    <main className="container mx-auto max-w-2xl px-4 py-10 md:px-6">
      <Link
        href="/order"
        className="text-muted-foreground hover:text-foreground mb-6 flex items-center gap-2 text-sm transition-colors"
      >
        <ArrowLeft className="h-4 w-4" />
        메뉴판으로 돌아가기
      </Link>

      <div className="flex flex-col items-center text-center">
        <div className={`rounded-full p-4 ${bg} ${color} mb-6`}>
          <StatusIcon className="h-12 w-12" />
        </div>
        <h1 className="font-display text-4xl">{label}</h1>
        <p className="text-muted-foreground mt-2 max-w-sm">{description}</p>
      </div>

      <Card className="mt-12 overflow-hidden rounded-2xl border-none shadow-sm">
        <div className="bg-muted/30 p-6">
          <div className="mb-4 flex items-center justify-between">
            <span className="text-muted-foreground text-sm">주문 번호</span>
            <span className="font-mono text-sm font-medium">
              {order.id.split('-')[0].toUpperCase()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-muted-foreground text-sm">주문 시간</span>
            <span className="text-sm font-medium">
              {new Date(order.created_at).toLocaleTimeString('ko-KR', {
                hour: '2-digit',
                minute: '2-digit',
              })}
            </span>
          </div>
        </div>

        <div className="p-6">
          <h2 className="mb-4 text-lg font-semibold">주문 내역</h2>
          <div className="space-y-3">
            {order.order_items.map((item) => (
              <div key={item.id} className="flex justify-between text-sm">
                <span>
                  {item.menu_items.name} × {item.quantity}
                </span>
                <span className="font-medium">
                  ₩{(item.price * item.quantity).toLocaleString()}
                </span>
              </div>
            ))}
          </div>
          <Separator className="my-6" />
          <div className="flex items-center justify-between text-lg font-bold">
            <span>총액</span>
            <span className="text-primary">
              ₩{order.total_price.toLocaleString()}
            </span>
          </div>
        </div>
      </Card>

      <div className="mt-12 flex flex-col gap-4">
        <p className="text-muted-foreground text-center text-xs">
          주문 상태가 변경되면 자동으로 페이지에 반영됩니다.
        </p>
      </div>
    </main>
  );
}

import { Button } from '@/components/ui/button';
