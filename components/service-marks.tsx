import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function Mark({
  children,
  color = "neutral",
  className,
}: {
  children: ReactNode
  color?: "neutral" | "green" | "blue" | "orange" | "purple" | "yellow" | "red"
  className?: string
}) {
  const palette: Record<string, string> = {
    neutral: "bg-muted text-foreground",
    green: "bg-[color-mix(in_oklch,var(--positive)_100%,white_0%)] text-white",
    blue: "bg-[var(--brand)] text-[var(--brand-foreground)]",
    orange: "bg-[oklch(0.72_0.18_55)] text-white",
    purple: "bg-[oklch(0.62_0.18_295)] text-white",
    yellow: "bg-[oklch(0.82_0.16_92)] text-[oklch(0.2_0.02_80)]",
    red: "bg-[var(--negative)] text-white",
  }
  return (
    <span
      className={cn(
        "flex h-11 w-11 items-center justify-center rounded-full text-[15px] font-bold",
        palette[color],
        className,
      )}
    >
      {children}
    </span>
  )
}

export function GptMark() {
  return (
    <Mark color="green" className="relative">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-5 w-5">
        <path
          d="M12 3.6c1.9-1.1 4.3-.7 5.7.9 1.4 1.6 1.5 4 .2 5.7 1.2 1.7 1.1 4.1-.3 5.7-1.4 1.6-3.8 2-5.7.9-1.9 1.1-4.3.7-5.7-.9-1.4-1.6-1.5-4-.3-5.7-1.3-1.7-1.2-4.1.2-5.7 1.4-1.6 3.8-2 5.9-.9z"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path d="M12 7.5v9M8.5 9.5l7 5M8.5 14.5l7-5" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
      </svg>
    </Mark>
  )
}

export function GeminiMark() {
  return (
    <Mark color="blue">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-5 w-5">
        <path
          d="M12 2.5c.8 4.6 4 7.8 9 9-5 1.2-8.2 4.4-9 9-.8-4.6-4-7.8-9-9 5-1.2 8.2-4.4 9-9z"
          fill="currentColor"
        />
      </svg>
    </Mark>
  )
}

export function VeteranMark() {
  return (
    <Mark color="yellow">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-5 w-5">
        <path d="M4 7h16l-2 11H6L4 7z" stroke="currentColor" strokeWidth="1.6" strokeLinejoin="round" />
        <path d="M9 7V5a3 3 0 016 0v2" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      </svg>
    </Mark>
  )
}

export function PerplexityMark() {
  return (
    <Mark color="purple">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-5 w-5">
        <path d="M12 3v18M3 12h18M6 6l12 12M18 6L6 18" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    </Mark>
  )
}

export function ClaudeMark() {
  return (
    <Mark color="orange">
      <svg viewBox="0 0 24 24" fill="none" aria-hidden className="h-5 w-5">
        <path
          d="M7.5 4.5l3.5 15M12.5 4.5L9 19.5M4 10h16M4 14h16"
          stroke="currentColor"
          strokeWidth="1.6"
          strokeLinecap="round"
        />
      </svg>
    </Mark>
  )
}
