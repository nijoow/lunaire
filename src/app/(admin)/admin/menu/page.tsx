import { Metadata } from 'next';

import { DataTable } from '@/components/admin/data-table';
import { getAllMenuItems } from '@/domain/menu/menu.service';
import { columns } from './_components/columns';

export const metadata: Metadata = {
  title: 'Menu Management',
  description: 'Manage your cafe menu items.',
};

export default async function MenuPage() {
  const data = await getAllMenuItems();

  return (
    <div className="flex-1 space-y-4 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Menu</h2>
      </div>
      <DataTable columns={columns} data={data} searchKey="name" />
    </div>
  );
}
