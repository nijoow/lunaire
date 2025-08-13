import { Period } from '../types';

export type Category =
  | 'coffee'
  | 'non-coffee'
  | 'brunch'
  | 'cocktail'
  | 'wine'
  | 'etc';

export type MenuItem = {
  id: string;
  name: string;
  note?: string;
  price: number;
  period: Period;
  category: Category;
  signature?: boolean;
  isNew?: boolean;
  isBest?: boolean;
};
