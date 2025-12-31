import { getAllMenuItems } from '@/domain/menu/menu.service';
import { MenuSkeleton } from '@/features/menu/menu-skeleton';
import { Suspense } from 'react';
import { MenuTabs } from './_components/menu-tabs';

export default function MenuPage() {
  return (
    <main className="container mx-auto px-4 py-10 md:px-6">
      <h1 className="font-display text-4xl">Menu</h1>
      <p className="text-muted-foreground mt-2">
        낮은 커피와 브런치, 밤은 칵테일과 와인을 즐겨보세요.
      </p>

      <Suspense fallback={<MenuTabsFallback />}>
        <MenuTabsFetcher />
      </Suspense>
    </main>
  );
}

// 데이터 페칭을 담당하는 서버 컴포넌트
async function MenuTabsFetcher() {
  const items = await getAllMenuItems();
  return <MenuTabs items={items} />;
}

import { Category } from '@/domain/menu/types';
import { MenuFilters } from '@/features/menu/menu-filters';

// 로딩 상태일 때 보여줄 폴백 컴포넌트
function MenuTabsFallback() {
  const CATEGORIES: Category[] = ['coffee', 'non-coffee', 'dessert'];

  return (
    <div>
      <div className="pointer-events-none mt-6 opacity-50">
        <MenuFilters
          category="all"
          setCategory={() => {}}
          categories={CATEGORIES}
        />
      </div>
      <div className="bg-border my-6 h-[1px]" />
      <MenuSkeleton />
    </div>
  );
}
