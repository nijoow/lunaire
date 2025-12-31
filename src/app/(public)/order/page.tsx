import { getAllMenuItems } from '@/domain/menu/menu.service';
import { MenuSkeleton } from '@/features/menu/menu-skeleton';
import { Suspense } from 'react';
import { OrderClient } from './_components/order-client';

interface Props {
  searchParams: Promise<{ table?: string }>;
}

export default async function OrderPage({ searchParams }: Props) {
  const params = await searchParams;
  const tableId = params.table || null;

  return (
    <Suspense fallback={<OrderFallback />}>
      <OrderFetcher tableId={tableId} />
    </Suspense>
  );
}

async function OrderFetcher({ tableId }: { tableId: string | null }) {
  const items = await getAllMenuItems();
  return <OrderClient items={items} tableId={tableId} />;
}

function OrderFallback() {
  return (
    <main className="container mx-auto w-full px-4 py-10 md:px-6">
      <section>
        <h1 className="font-display text-4xl">Order</h1>
        <div className="mt-6">
          <MenuSkeleton />
        </div>
      </section>
    </main>
  );
}
