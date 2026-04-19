import Link from "next/link"
import { ChevronLeft } from "lucide-react"

export function BackLink({ href, label = "Back" }: { href: string; label?: string }) {
  return (
    <Link
      href={href}
      className="press inline-flex items-center gap-1.5 rounded-full px-2 py-1 text-[14px] font-medium text-foreground/90 hover:bg-muted"
    >
      <ChevronLeft className="h-4 w-4" aria-hidden />
      {label}
    </Link>
  )
}
