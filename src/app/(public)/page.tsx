import Image from "next/image";
import { Hero } from "./_components/hero";
import { TodayBanner } from "./_components/today-banner";
import { SignatureGrid } from "./_components/signature-grid";
import { ReserveCta } from "./_components/reserve-cta";
import { InstaGrid } from "./_components/instagram-grid";

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <Hero />
      <TodayBanner />
      <SignatureGrid />
      <ReserveCta />
      <InstaGrid />
    </main>
  );
}
