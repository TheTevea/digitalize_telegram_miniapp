import { Lock } from "lucide-react"
import { MiniAppFrame } from "@/components/mini-app-frame"
import { BackLink } from "@/components/back-link"
import { AssetRow } from "@/components/asset-row"
import { GptMark, GeminiMark, ClaudeMark, PerplexityMark, VeteranMark } from "@/components/service-marks"

type Service = {
  id: string
  href: string
  name: string
  tagline: string
  from: string
  mark: React.ReactNode
  live?: boolean
  locked?: boolean
  badge?: "new"
}

const services: Service[] = [
  {
    id: "gpt",
    href: "/verify/gpt",
    name: "ChatGPT",
    tagline: "Plus & Pro via session token",
    from: "$3.00",
    mark: <GptMark />,
    live: true,
  },
  {
    id: "gemini",
    href: "/verify/gemini",
    name: "Gemini AI Pro",
    tagline: "12 months · Google One included",
    from: "$2.00",
    mark: <GeminiMark />,
    live: true,
  },
  {
    id: "claude",
    href: "/verify/claude",
    name: "Claude Pro",
    tagline: "Anthropic Pro · 1 month",
    from: "$9.00",
    mark: <ClaudeMark />,
    badge: "new",
  },
  {
    id: "ppx",
    href: "/verify/perplexity",
    name: "Perplexity Pro",
    tagline: "Yearly · Pro Search",
    from: "$5.00",
    mark: <PerplexityMark />,
  },
  {
    id: "vet",
    href: "#",
    name: "Veteran",
    tagline: "Long-term verified accounts",
    from: "—",
    mark: <VeteranMark />,
    locked: true,
  },
]

export default function VerifyPage() {
  return (
    <MiniAppFrame>
      <div className="flex flex-col gap-3">
        <BackLink href="/" />

        <header className="px-1 pb-1">
          <h1 className="text-[22px] font-semibold leading-tight tracking-tight text-balance">
            Choose a service
          </h1>
          <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
            Live stock, transparent pricing, full reissue warranty on every activation.
          </p>
        </header>

        <ul className="card-soft overflow-hidden rounded-2xl">
          {services.map((s, i) => (
            <li key={s.id} className={i !== 0 ? "border-t border-border/60" : ""}>
              <AssetRow
                href={s.locked ? undefined : s.href}
                mark={s.mark}
                title={
                  <span className="flex items-center gap-1.5">
                    {s.name}
                    {s.live ? (
                      <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--positive)]" aria-label="Live" />
                    ) : null}
                    {s.badge === "new" ? (
                      <span className="rounded-md bg-[var(--brand)] px-1.5 py-[1px] text-[9px] font-bold uppercase tracking-wider text-[var(--brand-foreground)]">
                        New
                      </span>
                    ) : null}
                  </span>
                }
                subtitle={s.tagline}
                value={s.locked ? undefined : s.from}
                meta={s.locked ? undefined : "from"}
                trailing={
                  s.locked ? (
                    <Lock className="ml-1 h-4 w-4 shrink-0 text-muted-foreground" aria-hidden />
                  ) : undefined
                }
              />
            </li>
          ))}
        </ul>

        <div className="card-soft grid grid-cols-3 gap-0 rounded-2xl px-2 py-3">
          {[
            { k: "Warranty", v: "Up to 12m" },
            { k: "Reissue", v: "Covered" },
            { k: "Delivery", v: "< 2 min" },
          ].map((t) => (
            <div key={t.k} className="flex flex-col items-center gap-0.5">
              <p className="text-[11px] text-muted-foreground">{t.k}</p>
              <p className="text-[13px] font-semibold">{t.v}</p>
            </div>
          ))}
        </div>
      </div>
    </MiniAppFrame>
  )
}
