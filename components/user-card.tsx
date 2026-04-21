import Image from "next/image"
import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export function UserCard({ variant = "full" }: { variant?: "full" | "compact" }) {
  if (variant === "compact") {
    return (
      <div className="card-soft flex items-center gap-3 rounded-2xl px-4 py-3">
        <Avatar />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <p className="text-[14px] font-semibold tracking-tight">TEVEA</p>
            <span className="inline-flex items-center rounded-full bg-destructive px-1.5 py-[1px] text-[9px] font-bold uppercase tracking-wider text-destructive-foreground">
              VIP
            </span>
          </div>
          <p className="truncate text-[12px] text-muted-foreground tabular">@TEVEA_CHHEM</p>
        </div>
        <div className="text-right">
          <p className="text-[10px] text-muted-foreground">Balance</p>
          <p className="text-[14px] font-semibold tabular">$12.40</p>
        </div>
      </div>
    )
  }

  return (
    <section aria-label="User profile" className="card-soft overflow-hidden rounded-2xl">
      <div className="flex items-center gap-3 px-4 pt-4">
        <Avatar size={52} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <h2 className="text-[16px] font-semibold leading-tight tracking-tight">TEVEA CHHEM</h2>
            <span className="inline-flex items-center rounded-full bg-destructive px-1.5 py-[1px] text-[9px] font-bold uppercase tracking-wider text-destructive-foreground">
              VIP
            </span>
          </div>
          {/* <p className="mt-0.5 truncate text-[12px] text-muted-foreground tabular">@TEVEA_CHHEM</p> */}
          <p className="mt-1 inline-flex items-center gap-1 rounded-full bg-muted px-1.5 py-[1px] text-[10px] font-medium text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--brand)]" />
            Tier 2 · Trusted
          </p>
        </div>
      </div>

      <div className="mt-3 grid grid-cols-3 gap-2.5 px-2 pb-3">
        <Stat label="Verified" value="7" tone="brand" />
        <Stat label="Invited" value="3" />
      </div>
    </section>
  )
}

function Avatar({ size = 40 }: { size?: number }) {
  return (
    <div className="relative shrink-0">
      <Image
        src="/avatar.jpg"
        alt="TEVEA"
        width={size}
        height={size}
        className="rounded-full object-cover"
        style={{ width: size, height: size }}
      />
      <span
        aria-hidden
        className="absolute -bottom-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-[var(--brand)] ring-2 ring-card"
      >
        <Check className="h-2.5 w-2.5 text-[var(--brand-foreground)]" strokeWidth={3.5} />
      </span>
    </div>
  )
}

function Stat({ label, value, tone }: { label: string; value: string; tone?: "brand" }) {
  return (
    <div className={cn("flex flex-col items-center rounded-2xl bg-muted/60 px-2 py-3 text-center")}>
      <p
        className={cn(
          "text-[18px] font-semibold leading-none tabular",
          tone === "brand" ? "text-[var(--brand)]" : "text-foreground",
        )}
      >
        {value}
      </p>
      <p className="mt-1 text-[11px] text-muted-foreground">{label}</p>
    </div>
  )
}
