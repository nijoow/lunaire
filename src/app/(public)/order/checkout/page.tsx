'use client';

import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { createOrder } from '@/domain/order/order.service';
import { useCart } from '@/stores/cart';
import { ArrowLeft, Loader2, ShoppingBag } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'sonner';

export default function CheckoutPage() {
  const { items, subtotal, clear, tableNo } = useCart();
  const router = useRouter();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleOrder = async () => {
    if (items.length === 0) {
      toast.error('장바구니가 비어 있습니다.');
      return;
    }

    try {
      setIsSubmitting(true);

      const orderData = {
        table_no: tableNo || 'counter',
        total_price: subtotal(),
        status: 'pending' as const,
      };

      const orderItems = items.map((item) => ({
        menu_item_id: item.id,
        quantity: item.quantity,
        price: item.price,
      }));

      const order = await createOrder(orderData, orderItems);

      clear();
      toast.success('주문이 완료되었습니다!');
      router.push(`/order/status/${order.id}`);
    } catch (error) {
      console.error('Order error:', error);
      toast.error('주문 처리 중 오류가 발생했습니다.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <main className="container mx-auto flex min-h-[60vh] flex-col items-center justify-center px-4 py-20 text-center">
        <div className="bg-muted flex h-20 w-20 items-center justify-center rounded-full">
          <ShoppingBag className="text-muted-foreground h-10 w-10 opacity-20" />
        </div>
        <h1 className="mt-6 text-2xl font-bold">장바구니가 비어 있습니다</h1>
        <p className="text-muted-foreground mt-2">
          메뉴판에서 상품을 담아주세요.
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
        주문 페이지로 돌아가기
      </Link>

      <h1 className="font-display text-4xl">주문 확인</h1>
      <p className="text-muted-foreground mt-2">
        선택하신 상품들을 확인해 주세요.
      </p>

      <div className="mt-10 space-y-8">
        <section>
          <h2 className="text-lg font-semibold">
            장바구니 내역 ({items.length}개)
          </h2>
          <div className="mt-4 divide-y">
            {items.map((item) => (
              <div key={item.id} className="flex justify-between py-4">
                <div className="flex-1">
                  <h4 className="font-medium">{item.name}</h4>
                  <p className="text-muted-foreground text-sm">
                    ₩{item.price.toLocaleString()} × {item.quantity}
                  </p>
                </div>
                <p className="text-sm font-medium">
                  ₩{(item.price * item.quantity).toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        </section>

        <section className="bg-muted/30 rounded-2xl p-6">
          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-muted-foreground">테이블 번호</span>
              <span className="font-medium">{tableNo || '카운터'}</span>
            </div>
            <Separator />
            <div className="flex justify-between pt-2 text-lg font-bold">
              <span>총 결제 금액</span>
              <span className="text-primary">
                ₩{subtotal().toLocaleString()}
              </span>
            </div>
          </div>
        </section>

        <Button
          className="w-full rounded-2xl py-6 text-lg font-semibold"
          size="lg"
          onClick={handleOrder}
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
              주문 처리 중...
            </>
          ) : (
            '주문 완료하기'
          )}
        </Button>

        <p className="text-muted-foreground text-center text-xs">
          주문 완료 버튼을 누르면 주방으로 주문이 즉시 전송됩니다.
        </p>
      </div>
    </main>
  );
}
