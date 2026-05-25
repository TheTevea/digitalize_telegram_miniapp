export function HomePageSkeleton() {
  return (
    <div className="flex flex-col gap-3">
      {/* Map skeleton */}
      <div className="-mx-4 -mt-2 h-[calc(100dvh-80px)] w-[calc(100%+2rem)]">
        <div className="skeleton-bone h-full w-full rounded-none" />
      </div>
    </div>
  )
}
