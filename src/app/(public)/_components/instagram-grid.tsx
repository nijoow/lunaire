// components/home/insta-grid.tsx
export function InstaGrid() {
  // TODO: 실제 데이터 연동
  const items = Array.from({ length: 6 }).map((_, i) => ({ id: i }));

  return (
    <section className="border-t w-full px-6 md:px-10 bg-secondary/30">
      <div className="container py-12 mx-auto">
        <div className="flex items-baseline justify-between">
          <h3 className="font-display text-2xl">Instagram</h3>
          <a
            href="https://instagram.com"
            target="_blank"
            className="text-sm text-muted-foreground hover:text-foreground"
            rel="noreferrer"
          >
            @cafe.lunaire
          </a>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3">
          {items.map((it) => (
            <div
              key={it.id}
              className="aspect-square rounded-xl bg-muted/40"
              aria-hidden
            />
          ))}
        </div>
      </div>
    </section>
  );
}
