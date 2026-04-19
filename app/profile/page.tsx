import { Bell, ChevronRight, Copy, Headphones, LifeBuoy, Lock, Share2, UserCog } from "lucide-react"
import { MiniAppFrame } from "@/components/mini-app-frame"
import { UserCard } from "@/components/user-card"
import { cn } from "@/lib/utils"

const sections = [
  {
    label: "Account",
    rows: [
      { icon: UserCog, label: "Profile settings", meta: "@TEVEA_CHHEM" },
      { icon: Lock, label: "Security", meta: "Session · 2FA" },
      { icon: Bell, label: "Notifications", meta: "All on" },
    ],
  },
  {
    label: "Rewards & support",
    rows: [
      { icon: Share2, label: "Invite friends", meta: "Earn $0.50 / invite" },
      { icon: LifeBuoy, label: "Help center", meta: "FAQs · Guides" },
      { icon: Headphones, label: "Contact support", meta: "Avg. reply 8m" },
    ],
  },
] as const

export default function ProfilePage() {
  return (
    <MiniAppFrame>
      <div className="flex flex-col gap-3">
        <UserCard />

        <TierProgress />

        <ReferralCard />

        {sections.map((section) => (
          <section key={section.label}>
            <h3 className="mb-1.5 px-1 text-[12px] font-semibold text-muted-foreground">
              {section.label}
            </h3>
            <ul className="card-soft overflow-hidden rounded-2xl">
              {section.rows.map((row, idx) => {
                const Icon = row.icon
                return (
                  <li key={row.label}>
                    <button
                      type="button"
                      className={cn(
                        "press flex w-full items-center justify-between gap-3 px-4 py-3 text-left hover:bg-black/[0.02]",
                        idx !== section.rows.length - 1 && "border-b border-border/60",
                      )}
                    >
                      <span className="flex items-center gap-3">
                        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-foreground/80">
                          <Icon className="h-4 w-4" aria-hidden />
                        </span>
                        <span>
                          <p className="text-[14px] font-medium">{row.label}</p>
                          <p className="text-[11.5px] text-muted-foreground tabular">{row.meta}</p>
                        </span>
                      </span>
                      <ChevronRight className="h-4 w-4 text-muted-foreground" aria-hidden />
                    </button>
                  </li>
                )
              })}
            </ul>
          </section>
        ))}

        <p className="text-center text-[11px] text-muted-foreground">
          VetVerify · v1.2.0 · Telegram mini app
        </p>
      </div>
    </MiniAppFrame>
  )
}

function TierProgress() {
  return (
    <section className="card-soft rounded-2xl p-4">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-[12px] text-muted-foreground">Loyalty tier</p>
          <p className="mt-0.5 text-[14px] font-semibold">
            Tier 2 <span className="text-muted-foreground">· Trusted</span>
          </p>
        </div>
        <span className="inline-flex items-center gap-1 rounded-full bg-[var(--brand-soft)] px-2 py-0.5 text-[11px] font-medium text-[var(--brand)]">
          <span className="h-1 w-1 rounded-full bg-[var(--brand)]" />
          Next: Tier 3
        </span>
      </div>
      <div className="mt-3 flex items-center gap-2">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-muted">
          <div className="h-full w-[63%] rounded-full bg-[var(--brand)]" />
        </div>
        <p className="text-[12px] text-muted-foreground tabular">7 / 12</p>
      </div>
      <p className="mt-2 text-[12px] text-muted-foreground">
        5 more verified activations unlock <span className="font-semibold text-foreground">5% off all plans</span>.
      </p>
    </section>
  )
}

function ReferralCard() {
  return (
    <section className="card-soft rounded-2xl p-4">
      <div className="flex items-center justify-between">
        <p className="text-[13px] font-semibold">Referral code</p>
        <p className="text-[11.5px] text-muted-foreground">$0.50 / invite</p>
      </div>
      <div className="mt-2 flex items-center gap-2">
        <code className="flex-1 rounded-xl bg-muted px-3 py-2.5 font-mono text-[13px] font-semibold tracking-wider">
          TEVEA-VV24
        </code>
        <button
          type="button"
          aria-label="Copy referral code"
          className="press flex h-10 w-10 items-center justify-center rounded-full bg-muted text-foreground/80 hover:bg-muted/70"
        >
          <Copy className="h-4 w-4" aria-hidden />
        </button>
      </div>
    </section>
  )
}
