"use client"

import { useState } from "react"
import { Inbox, SlidersHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { SearchBar } from "@/components/search-bar"
import { ChargingOrderCard } from "@/components/charging-order-card"
import { chargingSessions, type SessionStatus } from "@/lib/mock-data"

const tabs = [
  { id: "all", label: "All" },
  { id: "charging", label: "Charging" },
  { id: "complete", label: "Complete" },
] as const

type TabId = (typeof tabs)[number]["id"]

export function HistoryList() {
  const [tab, setTab] = useState<TabId>("all")
  const [search, setSearch] = useState("")

  const filtered = chargingSessions
    .filter((s) => {
      if (tab === "all") return true
      if (tab === "charging") return s.status === "charging" || s.status === "remote" || s.status === "local"
      return s.status === "complete"
    })
    .filter((s) => {
      if (!search) return true
      const q = search.toLowerCase()
      return (
        s.orderId.includes(q) ||
        s.cpId.toLowerCase().includes(q) ||
        s.location.toLowerCase().includes(q)
      )
    })

  // Calculate totals for current week
  const totalPower = chargingSessions.reduce((sum, s) => sum + s.power, 0)
  const totalPrice = chargingSessions.reduce((sum, s) => sum + s.priceUsed, 0)

  return (
    <div className="flex flex-col gap-3">
      {/* Search */}
      <SearchBar value={search} onChange={setSearch} placeholder="Search" />

      {/* Tabs */}
      <div className="relative">
        <div
          role="tablist"
          aria-label="History filter"
          className="flex items-center gap-0 border-b border-border"
        >
          {tabs.map((t) => (
            <button
              key={t.id}
              role="tab"
              aria-selected={tab === t.id}
              onClick={() => setTab(t.id)}
              className={cn(
                "press relative flex-1 py-2.5 text-center text-[13px] font-medium transition-colors",
                tab === t.id ? "text-[var(--brand)]" : "text-muted-foreground",
              )}
            >
              {t.label}
              {tab === t.id && (
                <span className="absolute inset-x-0 bottom-0 h-[2px] bg-[var(--brand)]" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Summary */}
      <div className="flex items-center justify-between px-1">
        <div>
          <p className="text-[15px] font-semibold">This week</p>
          <p className="mt-0.5 text-[12px] text-[var(--brand)]">
            Total Power : {totalPower} Kwh &nbsp;&nbsp; Total Price : ${totalPrice}
          </p>
        </div>
        <button
          type="button"
          className="press flex h-8 w-8 items-center justify-center rounded-full hover:bg-muted"
          aria-label="Filter options"
        >
          <SlidersHorizontal className="h-4 w-4 text-muted-foreground" aria-hidden />
        </button>
      </div>

      {/* Orders */}
      {filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <div className="flex flex-col gap-3">
          {filtered.map((session) => (
            <ChargingOrderCard key={session.orderId} session={session} />
          ))}
        </div>
      )}
    </div>
  )
}

function EmptyState() {
  return (
    <div className="card-soft flex flex-col items-center gap-2 rounded-2xl px-6 py-10 text-center">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
        <Inbox className="h-5 w-5 text-muted-foreground" aria-hidden />
      </span>
      <p className="text-[13px] font-semibold">No sessions found</p>
      <p className="text-[12px] text-muted-foreground">Your charging sessions will show up here.</p>
    </div>
  )
}
