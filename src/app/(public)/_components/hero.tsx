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
            href="/menu"
            className="inline-flex items-center rounded-xl bg-primary px-6 py-3 text-primary-foreground transition hover:opacity-90"
          >
            View Menu
          </Link>
          <Link
            href="/order"
            className="inline-flex items-center rounded-xl border border-input px-6 py-3 transition hover:bg-accent"
          >
            Order Online
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
