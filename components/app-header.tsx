"use client"

import Link from "next/link"
import { Zap, X } from "lucide-react"

export function AppHeader() {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between bg-background/85 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="flex items-center gap-1.5">
        <Zap className="h-5 w-5 text-[var(--brand)]" fill="currentColor" aria-hidden />
        <h1 className="text-[17px] font-semibold leading-none tracking-tight">EV Charger</h1>
      </div>
      <div className="flex items-center gap-1">
        <Link
          href="/"
          aria-label="Close"
          className="press flex h-8 w-8 items-center justify-center rounded-full text-foreground/80 hover:bg-muted"
        >
          <X className="h-5 w-5" aria-hidden />
        </Link>
      </div>
    </header>
  )
}
