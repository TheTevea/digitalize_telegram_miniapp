import Link from "next/link"
import { BadgeCheck, Compass, Gift, Plus } from "lucide-react"

const actions = [
  { href: "/verify", label: "Verify", icon: BadgeCheck },
  { href: "/store", label: "Browse", icon: Compass },
  { href: "/balance", label: "Top up", icon: Plus },
  { href: "/profile#referral", label: "Refer", icon: Gift },
] as const

export function ActionTiles() {
  return (
    <div className="grid grid-cols-4 gap-2">
      {actions.map(({ href, label, icon: Icon }) => (
        <Link
          key={href}
          href={href}
          className="card-soft press flex flex-col items-center justify-center gap-1.5 rounded-2xl py-3.5"
        >
          <span className="flex h-8 w-8 items-center justify-center rounded-full border border-border/80 text-foreground/90">
            <Icon className="h-[18px] w-[18px]" strokeWidth={1.8} aria-hidden />
          </span>
          <span className="text-[12px] font-medium text-foreground/90">{label}</span>
        </Link>
      ))}
    </div>
  )
}
