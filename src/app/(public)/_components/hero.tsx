import Link from "next/link";

export function Hero() {
  return (
    <section className="relative overflow-hidden border-b w-full">
      <div className="container py-20 md:py-28 mx-auto">
        <h1 className="font-display text-5xl md:text-6xl tracking-wide">
          Café Lunaire
        </h1>
        <p className="mt-3 max-w-prose text-lg text-muted-foreground">
          Brewed in Moonlight — 달빛 아래 고요와 여유를 담은 커피와 칵테일.
        </p>

        <div className="mt-8 flex flex-wrap gap-3">
          <Link
            href="/reserve"
            className="inline-flex items-center rounded-xl border border-primary px-5 py-3 hover:bg-primary hover:text-primary-foreground transition"
            aria-label="Reserve a table or book a space"
          >
            Reserve
          </Link>
          <Link
            href="/menu"
            className="inline-flex items-center rounded-xl bg-primary text-primary-foreground px-5 py-3 hover:opacity-95 transition"
            aria-label="View our menu"
          >
            View Menu
          </Link>
        </div>
      </div>

      {/* 은은한 데코 (의도적으로 절제) */}
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 -top-20 h-64 w-64 rounded-full bg-accent/30 blur-3xl dark:bg-accent/40"
      />
    </section>
  );
}
