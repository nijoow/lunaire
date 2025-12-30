import { getSignatureMenuItems } from '@/domain/menu/menu.service';
import Image from 'next/image';

export async function SignatureGrid() {
  const signatures = await getSignatureMenuItems();

  return (
    <section className="container py-14">
      <h2 className="font-display text-3xl">Signatures</h2>
      <p className="text-muted-foreground mt-2">
        낮과 밤을 대표하는 시그니처 4선
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {signatures.map((item) => (
          <article
            key={item.id}
            className="group bg-card text-card-foreground shadow-card hover:shadow-cardDark rounded-2xl p-5 transition"
          >
            <div className="bg-muted/40 relative aspect-video w-full overflow-hidden rounded-xl">
              {item.imageUrl && (
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className="object-cover transition group-hover:scale-105"
                />
              )}
            </div>
            <div className="mt-4 flex items-start justify-between">
              <h3 className="text-lg font-semibold">{item.name}</h3>
              <span className="text-muted-foreground rounded-full border px-2 py-0.5 text-xs">
                Signature
              </span>
            </div>
            <p className="text-muted-foreground mt-1 text-sm">{item.note}</p>
            <div className="mt-3 text-sm">₩{item.price.toLocaleString()}</div>
          </article>
        ))}
      </div>
    </section>
  );
}
