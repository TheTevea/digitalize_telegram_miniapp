"use client"

import { motion } from "framer-motion"
import { cn } from "@/lib/utils"

type Option = { value: string; label: string }

export function PillTabs({
  options,
  value,
  onChange,
  className,
}: {
  options: Option[]
  value: string
  onChange: (v: string) => void
  className?: string
}) {
  return (
    <div
      role="tablist"
      className={cn("card-soft relative inline-flex items-center gap-0 rounded-full p-1", className)}
    >
      {options.map((o) => {
        const active = o.value === value
        return (
          <button
            key={o.value}
            role="tab"
            aria-selected={active}
            type="button"
            onClick={() => onChange(o.value)}
            className={cn(
              "press relative z-10 rounded-full px-4 py-1.5 text-[13px] font-semibold transition-colors duration-200",
              active ? "text-foreground" : "text-muted-foreground",
            )}
          >
            {active ? (
              <motion.span
                layoutId="pill-tab-indicator"
                aria-hidden
                className="absolute inset-0 -z-10 rounded-full bg-card shadow-[0_1px_0_rgba(0,0,0,0.04),0_4px_10px_-4px_rgba(0,0,0,0.1)]"
                transition={{ type: "spring", stiffness: 500, damping: 35 }}
              />
            ) : null}
            {o.label}
          </button>
        )
      })}
    </div>
  )
}
