/**
 * HomePageSkeleton
 * Matches the exact layout of the "Verify" tab so users perceive instant load.
 */
export function HomePageSkeleton() {
  return (
    <div className="flex flex-col gap-3 animate-pulse-none">
      {/* ── Avatar + pill tabs row ─────────────────────────────── */}
      <div className="relative flex items-center justify-between py-1">
        {/* Avatar circle */}
        <span className="skeleton-circle h-9 w-9 shrink-0" />

        {/* Pill-tabs placeholder — two pill buttons */}
        <div className="absolute left-1/2 -translate-x-1/2 flex gap-1 rounded-full bg-muted/60 p-1">
          <span className="skeleton-bone h-7 w-16 rounded-full" />
          <span className="skeleton-bone h-7 w-16 rounded-full" />
        </div>

        {/* Spacer matching real spacer */}
        <span className="h-9 w-9" aria-hidden />
      </div>

      {/* ── Verification Services card ────────────────────────── */}
      <div className="card-soft overflow-hidden rounded-2xl">
        {/* Card header */}
        <div className="flex items-center justify-between px-4 pb-1 pt-3">
          <span className="skeleton-bone h-4 w-36" />
          <span className="skeleton-bone h-4 w-8" />
        </div>

        {/* Service rows × 4 */}
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="relative flex items-center gap-3 px-4 py-3
              [&:not(:last-child)]:after:absolute [&:not(:last-child)]:after:bottom-0
              [&:not(:last-child)]:after:left-[72px] [&:not(:last-child)]:after:right-0
              [&:not(:last-child)]:after:h-px [&:not(:last-child)]:after:bg-border/70
              [&:not(:last-child)]:after:content-['']"
          >
            {/* Icon mark */}
            <span className="skeleton-circle h-11 w-11 shrink-0" />

            {/* Text lines */}
            <div className="flex flex-1 flex-col gap-1.5">
              <span className="skeleton-bone h-3.5 w-32" />
              <span className="skeleton-bone h-3 w-24" />
            </div>

            {/* Price + chevron area */}
            <div className="flex items-center gap-1.5">
              <span className="skeleton-bone h-3.5 w-10" />
              <span className="skeleton-bone h-4 w-4 rounded-full" />
            </div>
          </div>
        ))}
      </div>

      {/* ── Action tiles — 4 columns ──────────────────────────── */}
      <div className="grid grid-cols-4 gap-2">
        {Array.from({ length: 4 }).map((_, i) => (
          <div
            key={i}
            className="card-soft flex flex-col items-center justify-center gap-1.5 rounded-2xl py-3.5"
          >
            <span className="skeleton-circle h-8 w-8" />
            <span className="skeleton-bone h-3 w-10" />
          </div>
        ))}
      </div>

      {/* ── Tutorial card ─────────────────────────────────────── */}
      <div className="card-soft overflow-hidden rounded-2xl">
        {/* Card header */}
        <div className="px-4 pb-1 pt-3">
          <span className="skeleton-bone h-4 w-48 block" />
          <span className="skeleton-bone h-3 w-28 block mt-1.5" />
        </div>

        {/* 16:9 video placeholder */}
        <div
          className="skeleton-bone mx-4 mb-4 mt-2 rounded-xl"
          style={{ aspectRatio: "16/9" }}
        />
      </div>
    </div>
  )
}
