import Link from "next/link"
import type { ReactNode } from "react"
import { ChevronRight } from "lucide-react"
import { cn } from "@/lib/utils"

type Props = {
  href?: string
  mark: ReactNode
  title: ReactNode
  subtitle?: ReactNode
  value?: ReactNode
  meta?: ReactNode
  trailing?: ReactNode
  badge?: ReactNode
  className?: string
  highlight?: boolean
}

export function AssetRow({ href, mark, title, subtitle, value, meta, trailing, badge, className, highlight }: Props) {
  const content = (
    <div className={cn("flex items-center gap-3 px-4 py-3", highlight && "row-highlight", className)}>
      <div className="flex h-11 w-11 shrink-0 items-center justify-center overflow-hidden rounded-full">{mark}</div>
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-1.5">
          <p className="truncate text-[15px] font-semibold leading-tight">{title}</p>
          {badge}
        </div>
        {subtitle ? (
          <p className="mt-0.5 truncate text-[12.5px] text-muted-foreground tabular">{subtitle}</p>
        ) : null}
      </div>
      <div className="flex shrink-0 flex-col items-end gap-0.5">
        {value ? <p className="text-[15px] font-semibold leading-tight tabular">{value}</p> : null}
        {meta ? <p className="text-[12px] text-muted-foreground tabular">{meta}</p> : null}
      </div>
      {trailing ?? (href ? <ChevronRight className="ml-1 h-4 w-4 shrink-0 text-muted-foreground/80" aria-hidden /> : null)}
    </div>
  )

  if (href) {
    return (
      <Link href={href} className="press block rounded-[inherit] hover:bg-black/[0.015]">
        {content}
      </Link>
    )
  }
  return content
}
