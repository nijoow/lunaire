export type Category = 'coffee' | 'non-coffee' | 'dessert';

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
