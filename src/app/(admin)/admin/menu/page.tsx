import { Metadata } from 'next';

import { MENU_ITEMS } from '@/domain/menu/data';
import { columns } from './_components/columns';
import { DataTable } from './_components/data-table';

export const metadata: Metadata = {
  title: 'Menu Management',
  description: 'Manage your cafe menu items.',
};

export default async function MenuPage() {
  const data = MENU_ITEMS;

  return (
    <div className="flex-1 space-y-4 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Menu</h2>
      </div>
      <DataTable columns={columns} data={data} />
    </div>
  );
}
