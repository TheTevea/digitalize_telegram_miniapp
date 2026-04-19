"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { HouseSimple, Storefront, Wallet, UserCircle, type Icon } from "@phosphor-icons/react/dist/ssr"
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
        className="flex w-full items-stretch gap-1 rounded-full bg-card p-1.5"
        style={{
          boxShadow:
            "0 1px 0 0 color-mix(in oklch, var(--foreground) 5%, transparent), 0 14px 30px -14px color-mix(in oklch, var(--foreground) 28%, transparent)",
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
                <span
                  aria-hidden
                  className="absolute inset-0 rounded-full bg-[var(--brand-soft)] transition-opacity duration-200"
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
