// components/home/reserve-cta.tsx
import Link from "next/link";

export function ReserveCta() {
  return (
    <section className="py-14">
      <div className="container rounded-2xl border bg-background p-8 text-center shadow-card">
        <h3 className="font-display text-2xl">Make a Reservation</h3>
        <p className="mt-2 text-muted-foreground">
          테이블 예약 또는 프라이빗 모임 공간 대여
        </p>
        <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
          <Link
            href="/reserve?type=table"
            className="inline-flex w-full justify-center items-center rounded-xl border border-primary px-5 py-3 hover:bg-primary hover:text-primary-foreground transition"
          >
            테이블 예약
          </Link>
          <Link
            href="/reserve?type=space"
            className="inline-flex w-full justify-center items-center rounded-xl bg-primary text-primary-foreground px-5 py-3 hover:opacity-95 transition hover:bg-secondary hover:text-secondary-foreground"
          >
            공간 대여
          </Link>
        </div>
      </div>
    </section>
  );
}
