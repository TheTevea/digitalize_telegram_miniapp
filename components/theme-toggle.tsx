"use client"

import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { cn } from "@/lib/utils"

export function ThemeToggle() {
  const { theme, setTheme, resolvedTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const current = mounted ? (theme === "system" ? resolvedTheme : theme) : "light"
  const isDark = current === "dark"

  return (
    <div
      role="group"
      aria-label="Theme"
      className="relative flex h-8 items-center rounded-full border border-border bg-secondary p-0.5"
    >
      <span
        aria-hidden
        className={cn(
          "absolute top-0.5 h-7 w-7 rounded-full bg-foreground transition-transform duration-200 ease-out",
          isDark ? "translate-x-7" : "translate-x-0",
        )}
      />
      <button
        type="button"
        onClick={() => setTheme("light")}
        aria-label="Light mode"
        aria-pressed={!isDark}
        className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full"
      >
        <Sun className={cn("h-3.5 w-3.5 transition-colors", !isDark ? "text-background" : "text-muted-foreground")} />
      </button>
      <button
        type="button"
        onClick={() => setTheme("dark")}
        aria-label="Dark mode"
        aria-pressed={isDark}
        className="relative z-10 flex h-7 w-7 items-center justify-center rounded-full"
      >
        <Moon className={cn("h-3.5 w-3.5 transition-colors", isDark ? "text-background" : "text-muted-foreground")} />
      </button>
    </div>
  )
}
