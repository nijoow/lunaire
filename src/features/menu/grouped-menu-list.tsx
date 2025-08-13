'use client';

import { Separator } from '@/components/ui/separator';
import type { Category, MenuItem } from '@/domain/menu/types';
import { categoryLabel } from '@/domain/menu/utils';
import { MenuList } from './menu-list';

type Props = {
  items: MenuItem[]; // 전체 메뉴
  categories: Category[]; // 보여줄 카테고리 순서
};

export function GroupedMenuList({ items, categories }: Props) {
  // 카테고리별로 필터
  const groups = categories
    .map((c) => ({
      category: c,
      items: items.filter((it) => it.category === c),
    }))
    .filter((g) => g.items.length > 0);

  if (groups.length === 0) {
    return (
      <div className="text-muted-foreground rounded-xl border p-10 text-center text-sm">
        표시할 메뉴가 없습니다.
      </div>
    );
  }

  return (
    <div className="grid gap-10">
      {groups.map((g, idx) => (
        <section key={g.category}>
          {/* 섹션 헤더 */}
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-display text-2xl">
              {categoryLabel[g.category]}
            </h3>
          </div>

          {/* 카드 그리드 (담기 버튼 있는 order 모드) */}
          <MenuList items={g.items} mode="order" />

          {/* 섹션 구분선: 마지막 섹션엔 표시 안 함 */}
          {idx < groups.length - 1 && <Separator className="mt-8" />}
        </section>
      ))}
    </div>
  );
}
