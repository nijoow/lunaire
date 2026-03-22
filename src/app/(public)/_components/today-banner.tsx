import { CalendarDays, Clock } from "lucide-react";

export function TodayBanner() {
  // TODO: DB/설정 연동
  const isOpen = true;
  const hours = "Weekdays 10:00–22:00 · Weekends 12:00–24:00";
  const today = "오늘 19:00 — Moonflower Live";

  return (
    <section aria-label="영업 시간 및 오늘의 이벤트" className="border-b bg-secondary/40 w-full">
      <div className="container mx-auto flex flex-col items-start gap-3 py-4 md:flex-row md:items-center md:justify-between">
        <div className="flex items-center gap-2">
          <Clock aria-hidden="true" className="h-4 w-4" />
          <p className="text-sm">
            {isOpen ? "Open Today" : "Closed Today"} · {hours}
          </p>
        </div>
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarDays aria-hidden="true" className="h-4 w-4" />
          <span>{today}</span>
        </div>
      </div>
    </section>
  );
}
