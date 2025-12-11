import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Clock, Instagram, MapPin, Phone } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';

export default function AboutPage() {
  return (
    <main className="flex flex-col">
      {/* Hero Section */}
      <section className="relative flex h-[60vh] w-full items-center justify-center overflow-hidden">
        <Image
          src="/images/about/interior-hero.png"
          alt="Cafe Lunaire Interior"
          fill
          className="object-cover brightness-[0.7]"
          priority
        />
        <div className="relative z-10 space-y-4 px-4 text-center text-white">
          <h1 className="font-display text-4xl font-bold tracking-tight md:text-6xl">
            Moment of Lunaire
          </h1>
          <p className="mx-auto max-w-2xl text-lg font-light opacity-90 md:text-xl">
            달빛이 머무는 시간, 당신의 일상에 작은 쉼표를 찍습니다.
          </p>
        </div>
      </section>

      {/* Brand Story */}
      <section className="bg-background px-4 py-20">
        <div className="container mx-auto max-w-4xl space-y-8 text-center">
          <span className="text-primary text-sm font-medium tracking-widest uppercase">
            Our Story
          </span>
          <h2 className="font-display text-foreground text-3xl font-bold md:text-4xl">
            공간, 그 이상의 가치를 짓다
          </h2>
          <div className="prose prose-lg dark:prose-invert text-muted-foreground mx-auto leading-relaxed">
            <p>
              포트폴리오용 카페 루네르는 2025년 서울의 한적한 골목에서
              시작되었습니다.
              <br />
              단순히 커피를 마시는 곳이 아닌, 영감을 얻고 휴식을 취할 수 있는
              복합 문화 공간을 지향합니다.
            </p>
            <p>
              엄선된 스페셜티 커피와 매일 아침 구워내는 베이커리,
              <br />
              그리고 시간대별로 변하는 음악과 조명은 당신의 오감을 깨울
              것입니다.
            </p>
          </div>
        </div>
      </section>

      <Separator className="mx-auto max-w-4xl" />

      {/* Info Grid */}
      <section className="px-4 py-20">
        <div className="container mx-auto grid max-w-6xl grid-cols-1 items-start gap-12 md:grid-cols-2">
          {/* Left: Image */}
          <div className="bg-muted relative aspect-square overflow-hidden rounded-2xl md:aspect-[4/5]">
            <Image
              src="/images/about/barista-brewing.png"
              alt="Barista brewing coffee"
              fill
              className="object-cover"
            />
          </div>

          {/* Right: Details */}
          <div className="space-y-12 py-4">
            <div className="space-y-6">
              <h3 className="flex items-center gap-2 text-2xl font-bold">
                <Clock className="text-primary h-6 w-6" /> Opening Hours
              </h3>
              <ul className="text-muted-foreground space-y-2">
                <li className="border-border/50 flex max-w-xs justify-between border-b pb-2">
                  <span>Mon - Fri</span>
                  <span className="text-foreground font-medium">
                    08:00 - 22:00
                  </span>
                </li>
                <li className="border-border/50 flex max-w-xs justify-between border-b pb-2">
                  <span>Sat - Sun</span>
                  <span className="text-foreground font-medium">
                    10:00 - 23:00
                  </span>
                </li>
                <li className="text-primary pt-2 text-sm">
                  * 라스트 오더: 마감 30분 전
                </li>
              </ul>
            </div>

            <div className="space-y-6">
              <h3 className="flex items-center gap-2 text-2xl font-bold">
                <MapPin className="text-primary h-6 w-6" /> Location
              </h3>
              <p className="text-muted-foreground">
                서울특별시 강남구 테헤란로 123, 루네르 빌딩 1층
              </p>
              <Button variant="outline" className="w-full max-w-xs" asChild>
                <a
                  href="https://maps.google.com/?q=Seoul"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Google Maps에서 보기
                </a>
              </Button>
            </div>

            <div className="space-y-6">
              <h3 className="flex items-center gap-2 text-2xl font-bold">
                <Phone className="text-primary h-6 w-6" /> Contact
              </h3>
              <p className="text-muted-foreground">02-1234-5678</p>
              <div className="flex gap-4">
                <Button variant="ghost" size="icon" asChild>
                  <Link href="https://instagram.com" target="_blank">
                    <Instagram className="h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
