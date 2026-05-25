"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { Home, LayoutGrid, ClipboardList, User, ScanLine } from "lucide-react"

type Item = {
  label: string
  href: string
  icon: typeof MapPin
  match: (p: string) => boolean
}

const items: readonly Item[] = [
  {
    label: "Home",
    href: "/",
    icon: Home,
    match: (p) => p === "/",
  },
  {
    label: "Station",
    href: "/station",
    icon: LayoutGrid,
    match: (p) => p.startsWith("/station"),
  },
  // center button handled separately
  {
    label: "History",
    href: "/history",
    icon: ClipboardList,
    match: (p) => p.startsWith("/history"),
  },
  {
    label: "Profile",
    href: "/profile",
    icon: User,
    match: (p) => p.startsWith("/profile"),
  },
] as const

export function BottomNav() {
  const pathname = usePathname() ?? "/"

  const left = items.slice(0, 2)
  const right = items.slice(2)

  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-0 z-20 mx-auto w-full max-w-[440px]"
    >
      <div className="relative flex items-end justify-center px-2 pb-[max(8px,env(safe-area-inset-bottom))]">
        {/* Nav bar */}
        <div
          className="flex w-full items-stretch rounded-full p-1"
          style={{
            background: "rgba(255,255,255,0.92)",
            backdropFilter: "blur(12px)",
            WebkitBackdropFilter: "blur(12px)",
            boxShadow:
              "0 1px 0 0 rgba(0,0,0,0.06), 0 14px 30px -14px rgba(0,0,0,0.18), inset 0 0.5px 0 rgba(255,255,255,0.9)",
          }}
        >
          {left.map(({ href, label, icon: Icon, match }) => {
            const active = match(pathname)
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "press relative flex flex-1 flex-col items-center justify-center gap-0.5 rounded-full py-2 transition-colors duration-200",
                  active ? "text-[var(--brand)]" : "text-muted-foreground",
                )}
              >
                {active ? (
                  <motion.span
                    layoutId="bottom-nav-indicator"
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-[var(--brand-soft)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                ) : null}
                <Icon
                  className="relative h-[20px] w-[20px] transition-transform duration-200"
                  aria-hidden
                />
                <span className="relative text-[10px] font-medium leading-none">{label}</span>
              </Link>
            )
          })}

          {/* Center spacer */}
          <div className="w-[72px] shrink-0" />

          {right.map(({ href, label, icon: Icon, match }) => {
            const active = match(pathname)
            return (
              <Link
                key={href}
                href={href}
                aria-current={active ? "page" : undefined}
                className={cn(
                  "press relative flex flex-1 flex-col items-center justify-center gap-0.5 rounded-full py-2 transition-colors duration-200",
                  active ? "text-[var(--brand)]" : "text-muted-foreground",
                )}
              >
                {active ? (
                  <motion.span
                    layoutId="bottom-nav-indicator"
                    aria-hidden
                    className="absolute inset-0 rounded-full bg-[var(--brand-soft)]"
                    transition={{ type: "spring", stiffness: 400, damping: 30 }}
                  />
                ) : null}
                <Icon
                  className="relative h-[20px] w-[20px] transition-transform duration-200"
                  aria-hidden
                />
                <span className="relative text-[10px] font-medium leading-none">{label}</span>
              </Link>
            )
          })}
        </div>

        {/* Center Scan button — floating above the bar */}
        <Link
          href="/station"
          aria-label="Scan"
          className="press absolute bottom-[max(22px,calc(env(safe-area-inset-bottom)+14px))] left-1/2 z-10 flex -translate-x-1/2 flex-col items-center"
        >
          <span
            className="flex h-[56px] w-[56px] items-center justify-center rounded-full text-[var(--brand-foreground)]"
            style={{
              background: "linear-gradient(135deg, var(--brand) 0%, var(--brand-2) 100%)",
              boxShadow:
                "0 6px 20px -4px color-mix(in oklch, var(--brand) 50%, transparent), 0 0 0 3px rgba(255,255,255,0.9)",
            }}
          >
            <ScanLine className="h-6 w-6" aria-hidden />
          </span>
          <span className="mt-0.5 text-[10px] font-medium text-muted-foreground">Scan</span>
        </Link>
      </div>
    </nav>
  )
}
