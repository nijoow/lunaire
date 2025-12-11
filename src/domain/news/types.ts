export type NewsCategory = 'notice' | 'promotion' | 'update';

export type NewsItem = {
  id: string;
  title: string;
  category: NewsCategory;
  date: string; // "2024-03-20"
  excerpt: string;
  content: string; // 간단한 마크다운이나 텍스트
};
