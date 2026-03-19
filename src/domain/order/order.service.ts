import { TablesInsert } from '@/lib/database.types';
import { supabase } from '@/lib/supabase';

export async function createOrder(
  order: TablesInsert<'orders'>,
  items: Omit<TablesInsert<'order_items'>, 'order_id'>[],
) {
  // 1. Create order
  const { data: orderData, error: orderError } = await supabase
    .from('orders')
    .insert(order)
    .select()
    .single();

  if (orderError) throw orderError;

  // 2. Create order items
  const orderItems = items.map((item) => ({
    ...item,
    order_id: orderData.id,
  }));

  const { error: itemsError } = await supabase
    .from('order_items')
    .insert(orderItems);

  if (itemsError) throw itemsError;

  return orderData;
}

export async function getOrderWithItems(orderId: string) {
  const { data, error } = await supabase
    .from('orders')
    .select('*, order_items(*, menu_items(name))')
    .eq('id', orderId)
    .single();

  if (error) throw error;
  return data;
}

export async function updateOrderStatus(
  orderId: string,
  status: 'pending' | 'preparing' | 'ready' | 'served' | 'cancelled',
) {
  const { error } = await supabase
    .from('orders')
    .update({ status })
    .eq('id', orderId);

  if (error) throw error;
}
