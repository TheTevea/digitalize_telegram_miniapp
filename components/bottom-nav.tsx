"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { HouseSimple, Storefront, Wallet, UserCircle, type Icon } from "@phosphor-icons/react/dist/ssr"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type Item = {
  label: string
  href: string
  icon: Icon
  match: (p: string) => boolean
}

const items: readonly Item[] = [
  {
    label: "Home",
    href: "/",
    icon: HouseSimple,
    match: (p) => p === "/" || p.startsWith("/verify") || p.startsWith("/store"),
  },
  { label: "History", href: "/history", icon: Storefront, match: (p) => p.startsWith("/history") },
  { label: "Balance", href: "/balance", icon: Wallet, match: (p) => p.startsWith("/balance") },
  { label: "Profile", href: "/profile", icon: UserCircle, match: (p) => p.startsWith("/profile") },
] as const

export function BottomNav() {
  const pathname = usePathname() ?? "/"
  return (
    <nav
      aria-label="Primary"
      className="fixed inset-x-0 bottom-[max(20px,env(safe-area-inset-bottom))] z-20 mx-auto flex w-full max-w-[420px] justify-center px-4"
    >
      <div
        className="flex w-full items-stretch gap-1 rounded-full p-1.5"
        style={{
          background: "rgba(255,255,255,0.85)",
          backdropFilter: "blur(8px)",
          WebkitBackdropFilter: "blur(8px)",
          boxShadow:
            "0 1px 0 0 rgba(0,0,0,0.06), 0 14px 30px -14px rgba(0,0,0,0.18), inset 0 0.5px 0 rgba(255,255,255,0.9)",
        }}
      >
        {items.map(({ href, label, icon: Icon, match }) => {
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
                className="relative h-[22px] w-[22px] transition-transform duration-200"
                weight={active ? "fill" : "regular"}
                aria-hidden
              />
              <span className="relative text-[11px] font-medium leading-none">{label}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
