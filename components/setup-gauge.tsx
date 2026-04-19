import Link from "next/link"

type Props = {
  total: number
  done: number
  title: string
  href: string
  cta?: string
}

export function SetupGauge({ total, done, title, href, cta = "Continue" }: Props) {
  const remaining = Math.max(0, total - done)
  const progress = total === 0 ? 0 : done / total
  const r = 92
  const circ = 2 * Math.PI * r
  const arcRatio = 0.75 // 270deg arc
  const arcLen = circ * arcRatio
  const progLen = arcLen * progress

  return (
    <section aria-labelledby="setup-gauge-title" className="relative flex flex-col items-center pt-2 pb-4">
      <div className="relative h-[232px] w-[232px]">
        <svg viewBox="0 0 232 232" className="h-full w-full -rotate-[135deg]" aria-hidden>
          <defs>
            <linearGradient id="vv-gauge" x1="0" y1="0" x2="1" y2="1">
              <stop offset="0%" stopColor="var(--brand-2)" />
              <stop offset="100%" stopColor="var(--brand)" />
            </linearGradient>
          </defs>
          {/* Track */}
          <circle
            cx="116"
            cy="116"
            r={r}
            fill="none"
            stroke="color-mix(in oklch, var(--foreground) 8%, transparent)"
            strokeWidth="18"
            strokeLinecap="round"
            strokeDasharray={`${arcLen} ${circ}`}
          />
          {/* Progress */}
          <circle
            cx="116"
            cy="116"
            r={r}
            fill="none"
            stroke="url(#vv-gauge)"
            strokeWidth="18"
            strokeLinecap="round"
            strokeDasharray={`${progLen} ${circ}`}
            style={{ transition: "stroke-dasharray 700ms cubic-bezier(0.22, 0.8, 0.26, 1)" }}
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
          <p className="text-[13px] font-medium text-[var(--brand)] tabular">
            {remaining === 0 ? "All set" : `${remaining} ${remaining === 1 ? "step" : "steps"} remaining`}
          </p>
          <h2 id="setup-gauge-title" className="mt-1 max-w-[160px] text-balance text-[20px] font-semibold leading-tight">
            {title}
          </h2>
          <Link
            href={href}
            className="press mt-3 inline-flex items-center justify-center rounded-full bg-[var(--brand)] px-5 py-2 text-[13px] font-semibold text-[var(--brand-foreground)] shadow-[0_6px_16px_-6px_color-mix(in_oklch,var(--brand)_55%,transparent)]"
          >
            {cta}
          </Link>
        </div>
      </div>
    </section>
  )
}
