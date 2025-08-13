// components/menu/menu-tabs.tsx
'use client';

import { Separator } from '@/components/ui/separator';
import { MENU_ITEMS } from '@/domain/menu/data';
import { Category, MenuItem } from '@/domain/menu/types';
import { Period } from '@/domain/types';
import { MenuFilters } from '@/features/menu/menu-filters';
import { MenuList } from '@/features/menu/menu-list';
import * as React from 'react';

const categoriesByPeriod: Record<Period, Category[]> = {
  day: ['coffee', 'non-coffee', 'brunch'],
  night: ['cocktail', 'wine', 'etc'],
};

export function MenuTabs() {
  const [period, setPeriod] = React.useState<Period>('day');
  const [category, setCategory] = React.useState<'all' | Category>('all');

  const filtered: MenuItem[] = MENU_ITEMS.filter((it) => {
    if (it.period !== period) return false;
    if (category !== 'all' && it.category !== category) return false;
    return true;
  });
  return (
    <>
      <div className="mt-6">
        <MenuFilters
          period={period}
          setPeriod={setPeriod}
          category={category}
          setCategory={setCategory}
          categoriesByPeriod={categoriesByPeriod}
        />
      </div>

      <Separator className="my-6" />

      <MenuList items={filtered} mode="browse" />
    </>
  );
}
