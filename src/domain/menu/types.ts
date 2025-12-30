import type { Database } from '@/lib/database.types';

export type Category = Database['public']['Enums']['category_name_type'];

export type MenuItem = {
  id: string;
  name: string;
  note?: string;
  price: number;
  category: Category;
  signature?: boolean;
  isNew?: boolean;
  isBest?: boolean;
  imageUrl?: string;
};
