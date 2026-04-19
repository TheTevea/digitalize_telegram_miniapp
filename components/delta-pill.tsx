import { cn } from "@/lib/utils"

export function DeltaPill({ value, className }: { value: number; className?: string }) {
  const positive = value >= 0
  const arrow = positive ? "↑" : "↓"
  return (
    <span
      className={cn(
        "inline-flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-[11px] font-semibold tabular",
        positive ? "bg-[var(--positive-soft)] text-[var(--positive)]" : "bg-[var(--negative-soft)] text-[var(--negative)]",
        className,
      )}
    >
      <span aria-hidden>{arrow}</span>
      {Math.abs(value).toFixed(2)}%
    </span>
  )
}
