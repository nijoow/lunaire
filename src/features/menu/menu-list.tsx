// features/menu/menu-list.tsx
'use client';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import type { MenuItem } from '@/domain/menu/types';
import { useCart } from '@/stores/cart';

type Props = {
  items: MenuItem[];
  mode?: 'browse' | 'order';
  onAddOverride?: (item: Pick<MenuItem, 'id' | 'name' | 'price'>) => void;
};

export function MenuList({ items, mode = 'browse', onAddOverride }: Props) {
  const add = useCart((s) => s.add);

  const handleAdd = (it: MenuItem) => {
    const payload = { id: it.id, name: it.name, price: it.price };
    onAddOverride ? onAddOverride(payload) : add(payload);
  };

  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {items.map((it) => (
        <Card key={it.id} className="shadow-card rounded-2xl p-5">
          <div
            className="bg-muted/40 aspect-video w-full rounded-xl"
            aria-hidden
          />
          <div className="mt-4 flex items-start justify-between gap-3">
            <div>
              <h3 className="text-lg font-semibold">{it.name}</h3>
              {it.note && (
                <p className="text-muted-foreground mt-1 text-sm">{it.note}</p>
              )}
            </div>
            <div className="flex gap-1">
              {it.signature && <Badge variant="outline">Signature</Badge>}
              {it.isNew && <Badge>New</Badge>}
            </div>
          </div>
          <div className="mt-3 text-sm">₩{it.price.toLocaleString()}</div>

          {mode === 'order' && (
            <button
              className="hover:border-primary mt-4 w-full rounded-xl border px-4 py-2"
              onClick={() => handleAdd(it)}
            >
              담기
            </button>
          )}
        </Card>
      ))}
    </div>
  );
}
