// features/menu/category-anchor-bar.tsx
'use client';

import type { Category } from '@/domain/menu/types';
import { categoryAnchorId, categoryLabel } from '@/domain/menu/utils';
import { cn } from '@/lib/utils';
import * as React from 'react';

export function CategoryAnchorBar({ categories }: { categories: Category[] }) {
  const [active, setActive] = React.useState<string>(
    categoryAnchorId(categories[0]),
  );

  React.useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]?.target?.id) setActive(visible[0].target.id);
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 1] },
    );

    categories.forEach((c) => {
      const el = document.getElementById(categoryAnchorId(c));
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [categories]);

  function scrollTo(id: string) {
    const el = document.getElementById(id);
    if (!el) return;
    window.scrollTo({ top: el.offsetTop - 80, behavior: 'smooth' });
  }

  return (
    <div className="bg-background/70 sticky top-16 z-30 border-b backdrop-blur">
      <div className="container flex gap-3 overflow-auto py-3">
        {categories.map((c) => {
          const id = categoryAnchorId(c);
          const isActive = active === id;
          return (
            <button
              key={c}
              onClick={() => scrollTo(id)}
              className={cn(
                'shrink-0 rounded-full border px-3 py-1 text-sm',
                isActive
                  ? 'border-primary text-primary'
                  : 'hover:border-primary/60',
              )}
            >
              {categoryLabel[c]}
            </button>
          );
        })}
      </div>
    </div>
  );
}
