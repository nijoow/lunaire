'use client';

import { Category } from '@/domain/menu/types';
import { MenuFilters } from '@/features/menu/menu-filters';

const CATEGORIES: Category[] = ['coffee', 'non-coffee', 'dessert'];

export const MenuFiltersFallback = () => {
  return (
    <div className="pointer-events-none mt-6 opacity-50">
      <MenuFilters
        category="all"
        setCategory={() => {}}
        categories={CATEGORIES}
      />
    </div>
  );
};
