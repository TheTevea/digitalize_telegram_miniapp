import { Check } from "lucide-react"
import { cn } from "@/lib/utils"

export function StepChip({
  n,
  state = "upcoming",
  className,
}: {
  n: number
  state?: "active" | "done" | "upcoming"
  className?: string
}) {
  return (
    <span
      aria-hidden
      className={cn(
        "flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-[11px] font-semibold leading-none transition-colors",
        state === "done" && "bg-[var(--brand)] text-[var(--brand-foreground)]",
        state === "active" && "bg-[var(--brand-soft)] text-[var(--brand)] ring-2 ring-[var(--brand)]",
        state === "upcoming" && "bg-muted text-muted-foreground",
        className,
      )}
    >
      {state === "done" ? <Check className="h-3 w-3" strokeWidth={3.5} /> : n}
    </span>
  )
}
