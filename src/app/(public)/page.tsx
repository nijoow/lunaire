import { Suspense } from 'react';
import { Hero } from './_components/hero';
import { InstaGrid } from './_components/instagram-grid';
import { ReserveCta } from './_components/reserve-cta';
import { SignatureGrid } from './_components/signature-grid';
import { SignatureSkeleton } from './_components/signature-skeleton';
import { TodayBanner } from './_components/today-banner';

export default function Home() {
  return (
    <main className="flex flex-col items-center">
      <Hero />
      <TodayBanner />
      <Suspense fallback={<SignatureSkeleton />}>
        <SignatureGrid />
      </Suspense>
      <ReserveCta />
      <InstaGrid />
    </main>
  );
}
