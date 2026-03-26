// components/menu/menu-tabs.tsx
'use client';

import { Separator } from '@/components/ui/separator';
import { getAllMenuItems } from '@/domain/menu/menu.service';
import { Category, MenuItem } from '@/domain/menu/types';
import { MenuFilters } from '@/features/menu/menu-filters';
import { MenuList } from '@/features/menu/menu-list';
import { supabase } from '@/lib/supabase';
import * as React from 'react';

const CATEGORIES: Category[] = ['coffee', 'non-coffee', 'dessert'];

interface Props {
  items: MenuItem[];
}

export function MenuTabs({ items }: Props) {
  const [category, setCategory] = React.useState<'all' | Category>('all');
  const [currentItems, setCurrentItems] = React.useState<MenuItem[]>(items);

  React.useEffect(() => {
    const channel = supabase
      .channel('menu-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'menu_items',
        },
        async () => {
          const updatedItems = await getAllMenuItems();
          setCurrentItems(updatedItems);
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, []);

  const filtered: MenuItem[] = currentItems.filter((it) => {
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
