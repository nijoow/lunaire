// features/menu/menu-filters.tsx
'use client';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import type { Category } from '@/domain/menu/types';
import { Period } from '@/domain/types';

export function MenuFilters({
  period,
  setPeriod,
  category,
  setCategory,
  categoriesByPeriod,
}: {
  period: Period;
  setPeriod: (p: Period) => void;
  category: 'all' | Category;
  setCategory: (c: 'all' | Category) => void;
  categoriesByPeriod: Record<Period, Category[]>;
}) {
  return (
    <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
      <Tabs
        value={period}
        onValueChange={(v) => {
          setPeriod(v as Period);
          setCategory('all');
        }}
        className="w-full md:w-auto"
      >
        <TabsList className="w-full md:w-auto">
          <TabsTrigger value="day" className="w-1/2 md:w-auto">
            Day
          </TabsTrigger>
          <TabsTrigger value="night" className="w-1/2 md:w-auto">
            Night
          </TabsTrigger>
        </TabsList>
      </Tabs>

      <div className="flex items-center gap-3">
        <Select
          value={category}
          onValueChange={(v) => setCategory(v as Category)}
        >
          <SelectTrigger className="w-[180px] rounded-xl">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All</SelectItem>
            {categoriesByPeriod[period].map((c) => (
              <SelectItem key={c} value={c}>
                {label(c)}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
}

function label(c: Category) {
  const map: Record<Category, string> = {
    coffee: 'Coffee',
    'non-coffee': 'Non‑Coffee',
    brunch: 'Brunch',
    cocktail: 'Cocktail',
    wine: 'Wine',
    etc: 'Etc',
  };
  return map[c] ?? c;
}
