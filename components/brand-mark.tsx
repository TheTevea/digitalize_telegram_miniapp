import { cn } from "@/lib/utils"

export function BrandMark({
  className,
  size = 28,
}: {
  className?: string
  size?: number
}) {
  return (
    <div
      className={cn(
        "relative flex items-center justify-center rounded-[8px] bg-brand text-brand-foreground font-mono font-semibold",
        className,
      )}
      style={{ width: size, height: size, fontSize: size * 0.42 }}
      aria-hidden
    >
      <span className="leading-none tracking-tight">VV</span>
      <span className="absolute -right-0.5 -top-0.5 h-1.5 w-1.5 rounded-full bg-brand ring-2 ring-background" />
    </div>
  )
}
