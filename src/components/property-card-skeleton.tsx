import { Card, CardContent } from "@/components/ui/card"

export function PropertyCardSkeleton() {
  return (
    <Card className="overflow-hidden">
      {/* Image skeleton */}
      <div className="aspect-[4/3] w-full animate-pulse bg-muted" />

      <CardContent className="p-6">
        {/* Price skeleton */}
        <div className="mb-2 h-8 w-32 animate-pulse rounded bg-muted" />

        {/* Address skeleton */}
        <div className="mb-4 h-5 w-3/4 animate-pulse rounded bg-muted" />

        {/* Features skeleton */}
        <div className="mb-4 flex gap-4">
          <div className="h-4 w-16 animate-pulse rounded bg-muted" />
          <div className="h-4 w-16 animate-pulse rounded bg-muted" />
          <div className="h-4 w-20 animate-pulse rounded bg-muted" />
        </div>

        {/* Description skeleton */}
        <div className="space-y-2">
          <div className="h-3 w-full animate-pulse rounded bg-muted" />
          <div className="h-3 w-5/6 animate-pulse rounded bg-muted" />
        </div>
      </CardContent>
    </Card>
  )
}
