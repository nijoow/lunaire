import { getAllMenuItems } from '@/domain/menu/menu.service';
import { OrderClient } from './_components/order-client';

interface Props {
  searchParams: Promise<{ table?: string }>;
}

export default async function OrderPage({ searchParams }: Props) {
  const [items, params] = await Promise.all([getAllMenuItems(), searchParams]);

  const tableId = params.table || null;

  return <OrderClient items={items} tableId={tableId} />;
}
