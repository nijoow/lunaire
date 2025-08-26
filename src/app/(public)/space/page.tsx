import { SpaceFaq } from './_components/space-faq';
import { SpaceForm } from './_components/space-form';
import { SpaceHero } from './_components/space-hero';

export default function SpacePage() {
  return (
    <div className="container mx-auto w-full px-4 py-10 md:px-6">
      <SpaceHero />
      <div className="mt-8 grid gap-8 lg:grid-cols-[1.3fr_.7fr]">
        <SpaceForm />
        <aside className="rounded-2xl border p-6">
          <h3 className="font-display text-2xl">Guidelines</h3>
          <ul className="text-muted-foreground mt-3 list-disc space-y-2 pl-5 text-sm">
            <li>최소 2시간 대여, 정시/30분 단위</li>
            <li>음식 반입 가능(냄새 강한 조리 불가)</li>
            <li>기물 파손 시 실비 청구</li>
          </ul>
          <SpaceFaq className="mt-6" />
        </aside>
      </div>
    </div>
  );
}
