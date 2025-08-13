import { Category } from './types';

export const categoryLabel: Record<Category, string> = {
  coffee: 'Coffee',
  'non-coffee': 'Non‑Coffee',
  brunch: 'Brunch',
  cocktail: 'Cocktail',
  wine: 'Wine',
  etc: 'Etc',
};

export function categoryAnchorId(c: Category) {
  return `category-${c}`;
}
