import { Category } from './types';

export const categoryLabel: Record<Category, string> = {
  coffee: 'Coffee',
  'non-coffee': 'Non‑Coffee',
  dessert: 'Dessert',
};

export function categoryAnchorId(c: Category) {
  return `category-${c}`;
}
