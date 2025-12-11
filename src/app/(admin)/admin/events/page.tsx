import { Metadata } from 'next';

import { DataTable } from '@/components/admin/data-table';
import { EVENTS } from '@/domain/events/data';
import { columns } from './_components/columns';

export const metadata: Metadata = {
  title: 'Events Management',
  description: 'Manage your cafe events.',
};

export default async function EventsPage() {
  const data = EVENTS;

  return (
    <div className="flex-1 space-y-4 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">Events</h2>
      </div>
      <DataTable columns={columns} data={data} searchKey="title" />
    </div>
  );
}
