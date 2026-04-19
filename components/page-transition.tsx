"use client"

import { usePathname } from "next/navigation"
import type { ReactNode } from "react"

/**
 * Lightweight route-change transition. No runtime libraries —
 * keyed by pathname so a single CSS keyframe re-runs on navigation.
 */
export function PageTransition({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  return (
    <div key={pathname} className="page-in">
      {children}
    </div>
  )
}
