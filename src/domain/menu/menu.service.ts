import type { Database } from '@/lib/database.types';
import { supabase } from '@/lib/supabase';
import type { MenuItem } from './types';

// DB에서 Join된 결과를 위한 타입 정의
type DBMenuItem = Database['public']['Tables']['menu_items']['Row'];
type DBCategory = {
  name: Database['public']['Enums']['category_name_type'];
  display_name: string | null;
};

type MenuItemWithCategory = DBMenuItem & {
  categories: DBCategory | null;
};

// DB Row를 MenuItem 타입으로 변환하는 헬퍼 함수
function mapToMenuItem(row: MenuItemWithCategory): MenuItem {
  if (!row.categories) {
    throw new Error(`Menu item ${row.id} is missing a category.`);
  }

  return {
    id: row.id,
    name: row.name,
    note: row.note || undefined,
    price: row.price,
    category: row.categories.name,
    signature: row.is_signature || false,
    isNew: row.is_new || false,
    isBest: row.is_best || false,
    imageUrl: row.image_url || undefined,
  };
}

// 모든 메뉴 정보와 연결된 카테고리 정보를 가져오는 공통 쿼리문
const MENU_QUERY = '*, categories(name, display_name)';

/**
 * 모든 활성화된 메뉴 항목을 가져옵니다.
 */
export async function getAllMenuItems(): Promise<MenuItem[]> {
  const { data, error } = await supabase
    .from('menu_items')
    .select(MENU_QUERY)
    .eq('is_available', true)
    .order('created_at', { ascending: true });

  if (error) {
    console.error('Failed to fetch menu items:', error);
    return [];
  }

  return data.map(mapToMenuItem);
}

/**
 * 시그니처 메뉴 항목만 가져옵니다.
 */
export async function getSignatureMenuItems(): Promise<MenuItem[]> {
  const { data, error } = await supabase
    .from('menu_items')
    .select(MENU_QUERY)
    .eq('is_signature', true)
    .eq('is_available', true);

  if (error) {
    console.error('Failed to fetch signature items:', error);
    return [];
  }

  return data.map(mapToMenuItem);
}
