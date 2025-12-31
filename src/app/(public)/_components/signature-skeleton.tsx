import { Skeleton } from '@/components/ui/skeleton';

export function SignatureSkeleton() {
  return (
    <section className="container py-14">
      <h2 className="font-display text-3xl">Signatures</h2>
      <p className="text-muted-foreground mt-2">
        낮과 밤을 대표하는 시그니처 4선
      </p>

      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: 4 }).map((_, i) => (
          <div key={i} className="shadow-card bg-card rounded-2xl p-5">
            {/* Image skeleton */}
            <Skeleton className="aspect-video w-full rounded-xl" />

            <div className="mt-4 flex items-start justify-between">
              {/* Name skeleton */}
              <Skeleton className="h-6 w-24" />
              {/* Badge skeleton */}
              <Skeleton className="h-5 w-16 rounded-full" />
            </div>

            {/* Note skeleton */}
            <Skeleton className="mt-2 h-4 w-full" />

            {/* Price skeleton */}
            <Skeleton className="mt-3 h-4 w-12" />
          </div>
        ))}
      </div>
    </section>
  );
}
