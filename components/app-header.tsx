"use client"

import Link from "next/link"
import { MoreVertical, X } from "lucide-react"

export function AppHeader() {
  return (
    <header className="sticky top-0 z-20 flex items-center justify-between bg-background/85 px-4 py-3 backdrop-blur supports-[backdrop-filter]:bg-background/70">
      <div className="flex items-center gap-1.5">
        <h1 className="text-[17px] font-semibold leading-none tracking-tight">VetVerify</h1>
        <VerifiedBadge />
      </div>
      <div className="flex items-center gap-1">
        <button
          type="button"
          aria-label="More options"
          className="press flex h-8 w-8 items-center justify-center rounded-full text-foreground/80 hover:bg-muted"
        >
          <MoreVertical className="h-5 w-5" aria-hidden />
        </button>
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

function VerifiedBadge() {
  return (
    <span
      aria-label="Verified"
      className="inline-flex h-[18px] w-[18px] items-center justify-center rounded-full bg-[var(--brand)] text-[var(--brand-foreground)]"
    >
      <svg viewBox="0 0 24 24" fill="none" className="h-3 w-3" aria-hidden>
        <path
          d="M5 12.5l4 4 10-10"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </span>
  )
}
