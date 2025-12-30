'use client';

import { MENU_ITEMS } from '@/domain/menu/data'; // 실제 데이터/API로 교체 가능
import type { Category } from '@/domain/menu/types';
import { GroupedMenuList } from '@/features/menu/grouped-menu-list';
import { useCart } from '@/stores/cart';
import { useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

const ORDER_CATEGORIES: Category[] = ['coffee', 'non-coffee', 'dessert'];
export default function OrderPage() {
  const sp = useSearchParams();
  const setTable = useCart((s) => s.setTable);

  useEffect(() => {
    const t = sp.get('table');
    if (t) setTable(t);
  }, [sp, setTable]);

  // 주문 가능한 전체 목록(예: 재고/시간대 필터는 여기서 사전 필터링 가능)
  const orderItems = MENU_ITEMS;

  return (
    <main className="container mx-auto w-full px-4 py-10 md:px-6">
      <section>
        <h1 className="font-display text-4xl">Order</h1>
        <div className="mt-6">
          <GroupedMenuList items={orderItems} categories={ORDER_CATEGORIES} />
        </div>
      </section>
      {/* CartSummary … */}
    </main>
  );
}
