// components/home/reserve-cta.tsx
import Link from "next/link";

export function ReserveCta() {
  return (
    <section className="py-14" aria-labelledby="space-cta-heading">
      <div className="container rounded-2xl border bg-background p-8 text-center shadow-card">
        <h2 id="space-cta-heading" className="font-display text-2xl">Private Space Rental</h2>
        <p className="mt-2 text-muted-foreground">
          워크샵, 파티, 또는 소규모 모임을 위한 프라이빗 공간을 대여해보세요.
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/space"
            className="inline-flex w-full items-center justify-center rounded-xl bg-primary px-5 py-3 text-primary-foreground transition hover:opacity-90 sm:w-auto"
          >
            공간 대여 안내 및 예약
          </Link>
        </div>
      </div>
    </section>
  );
}
