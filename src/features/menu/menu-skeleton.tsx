import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

export function MenuSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card key={i} className="shadow-card rounded-2xl p-5">
          {/* Image skeleton */}
          <Skeleton className="aspect-video w-full rounded-xl" />

          <div className="mt-4 flex items-start justify-between gap-3">
            <div className="w-full">
              {/* Name skeleton */}
              <Skeleton className="h-6 w-24" />
              {/* Note skeleton */}
              <Skeleton className="mt-2 h-4 w-full" />
            </div>
            {/* Badge skeleton */}
            <Skeleton className="h-6 w-12 rounded-full" />
          </div>

          {/* Price skeleton */}
          <Skeleton className="mt-4 h-5 w-16" />
        </Card>
      ))}
    </div>
  );
}
