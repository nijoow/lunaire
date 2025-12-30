'use client';

import type { Category, MenuItem } from '@/domain/menu/types';
import { GroupedMenuList } from '@/features/menu/grouped-menu-list';
import { useCart } from '@/stores/cart';
import { useEffect } from 'react';

interface Props {
  items: MenuItem[];
  tableId: string | null;
}

const ORDER_CATEGORIES: Category[] = ['coffee', 'non-coffee', 'dessert'];

export function OrderClient({ items, tableId }: Props) {
  const setTable = useCart((s) => s.setTable);

  useEffect(() => {
    if (tableId) {
      setTable(tableId);
    }
  }, [tableId, setTable]);

  return (
    <main className="container mx-auto w-full px-4 py-10 md:px-6">
      <section>
        <h1 className="font-display text-4xl">Order</h1>
        <div className="mt-6">
          <GroupedMenuList items={items} categories={ORDER_CATEGORIES} />
        </div>
      </section>
    </main>
  );
}
