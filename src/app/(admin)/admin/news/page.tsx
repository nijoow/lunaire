import { Metadata } from 'next';

import { DataTable } from '@/components/admin/data-table';
import { NEWS_ITEMS } from '@/domain/news/data';
import { columns } from './_components/columns';

export const metadata: Metadata = {
  title: 'News Management',
  description: 'Manage your cafe news and announcements.',
};

export default async function NewsPage() {
  const data = NEWS_ITEMS;

  return (
    <div className="flex-1 space-y-4 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight">News</h2>
      </div>
      <DataTable columns={columns} data={data} searchKey="title" />
    </div>
  );
}
