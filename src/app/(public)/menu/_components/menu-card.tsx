// components/menu/menu-card.tsx
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MenuItem } from "../_data";

export function MenuCard({ item }: { item: MenuItem }) {
  return (
    <Card className="group overflow-hidden rounded-2xl p-5 shadow-card transition hover:shadow-cardDark">
      {/* 썸네일 자리 - 실제에선 next/image로 교체 */}
      <div className="aspect-video w-full rounded-xl bg-muted/40" aria-hidden />

      <div className="mt-4 flex items-start justify-between gap-3">
        <div>
          <h3 className="text-lg font-semibold">{item.name}</h3>
          {item.note && (
            <p className="mt-1 text-sm text-muted-foreground">{item.note}</p>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-1">
          {item.signature && <Badge variant="outline">Signature</Badge>}
          {item.isNew && <Badge>New</Badge>}
        </div>
      </div>

      <div className="mt-3 text-sm">₩{item.price.toLocaleString()}</div>
    </Card>
  );
}
