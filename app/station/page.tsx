"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import { MiniAppFrame } from "@/components/mini-app-frame"
import { StationCard } from "@/components/station-card"
import { stations } from "@/lib/mock-data"

const tabs = [
  { id: "all", label: "All station" },
  { id: "available", label: "Available" },
] as const

type TabId = (typeof tabs)[number]["id"]

export default function StationPage() {
  const [tab, setTab] = useState<TabId>("all")

  const filtered =
    tab === "all"
      ? stations
      : stations.filter((s) => s.availableConnectors > 0)

  return (
    <MiniAppFrame>
      <div className="fade-up flex flex-col gap-4">
        {/* Pill toggle tabs */}
        <div
          role="tablist"
          className="inline-flex items-center self-center rounded-full bg-muted p-1"
        >
          {tabs.map((t) => {
            const active = t.id === tab
            return (
              <button
                key={t.id}
                role="tab"
                aria-selected={active}
                type="button"
                onClick={() => setTab(t.id)}
                className={cn(
                  "press relative z-10 rounded-full px-5 py-1.5 text-[13px] font-semibold transition-colors duration-200",
                  active ? "text-foreground" : "text-muted-foreground",
                )}
              >
                {active && (
                  <motion.span
                    layoutId="station-tab-indicator"
                    aria-hidden
                    className="absolute inset-0 -z-10 rounded-full bg-card shadow-[0_1px_0_rgba(0,0,0,0.04),0_4px_10px_-4px_rgba(0,0,0,0.1)]"
                    transition={{ type: "spring", stiffness: 500, damping: 35 }}
                  />
                )}
                {t.label}
              </button>
            )
          })}
        </div>

        {/* Station list */}
        <div className="flex flex-col gap-3">
          {filtered.map((station) => (
            <StationCard key={station.id} station={station} />
          ))}
        </div>
      </div>
    </MiniAppFrame>
  )
}
