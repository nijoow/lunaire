// components/menu/menu-tabs.tsx
'use client';

import { Separator } from '@/components/ui/separator';
import { MENU_ITEMS } from '@/domain/menu/data';
import { Category, MenuItem } from '@/domain/menu/types';
import { MenuFilters } from '@/features/menu/menu-filters';
import { MenuList } from '@/features/menu/menu-list';
import * as React from 'react';

const CATEGORIES: Category[] = ['coffee', 'non-coffee', 'dessert'];

export function MenuTabs() {
  const [category, setCategory] = React.useState<'all' | Category>('all');

  const filtered: MenuItem[] = MENU_ITEMS.filter((it) => {
    if (category !== 'all' && it.category !== category) return false;
    return true;
  });

  return (
    <>
      <div className="mt-6">
        <MenuFilters
          category={category}
          setCategory={setCategory}
          categories={CATEGORIES}
        />
      </div>

      <Separator className="my-6" />

      <MenuList items={filtered} mode="browse" />
    </>
  );
}
