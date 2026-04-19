"use client"

import { useState } from "react"
import { ArrowDownLeft, ArrowUpRight, CheckCircle2, Clock, Inbox, Undo2 } from "lucide-react"
import { cn } from "@/lib/utils"

type Status = "active" | "expired" | "refunded" | "pending"
type Entry = {
  id: string
  title: string
  date: string
  amount: string
  direction: "out" | "in"
  status: Status
  kind: "verify" | "wallet"
}

const all: Entry[] = [
  { id: "TX-00142", title: "GPT Plus · 1 month", date: "Apr 17, 2026", amount: "−$3.00", direction: "out", status: "active", kind: "verify" },
  { id: "TX-00141", title: "Top up · Telegram Stars", date: "Apr 15, 2026", amount: "+$5.00", direction: "in", status: "active", kind: "wallet" },
  { id: "TX-00138", title: "Referral · @arun", date: "Apr 10, 2026", amount: "+$0.50", direction: "in", status: "active", kind: "wallet" },
  { id: "TX-00128", title: "Gemini AI Pro · 12 months", date: "Mar 02, 2026", amount: "−$24.00", direction: "out", status: "expired", kind: "verify" },
  { id: "TX-00097", title: "GPT Pro · 5 seats", date: "Jan 14, 2026", amount: "−$45.00", direction: "out", status: "active", kind: "verify" },
  { id: "TX-00088", title: "Refund · GPT Plus", date: "Dec 22, 2025", amount: "+$3.00", direction: "in", status: "refunded", kind: "wallet" },
]

const tabs = [
  { id: "all", label: "All" },
  { id: "verify", label: "Verify" },
  { id: "wallet", label: "Wallet" },
] as const

type TabId = (typeof tabs)[number]["id"]

export function HistoryList() {
  const [tab, setTab] = useState<TabId>("all")
  const filtered = tab === "all" ? all : all.filter((r) => r.kind === tab)

  return (
    <div className="flex flex-col gap-3">
      <section className="card-soft flex items-stretch justify-between rounded-2xl px-2 py-3">
        <StatCell label="Spent · 90d" value="$72.00" />
        <Divider />
        <StatCell label="Activations" value="4" />
        <Divider />
        <StatCell label="Saved" value="$14.00" tone="brand" />
      </section>

      <div
        role="tablist"
        aria-label="History filter"
        className="flex items-center gap-1 rounded-full bg-muted p-1"
      >
        {tabs.map((t) => (
          <button
            key={t.id}
            role="tab"
            aria-selected={tab === t.id}
            onClick={() => setTab(t.id)}
            className={cn(
              "press flex-1 rounded-full px-3 py-1.5 text-[13px] font-medium transition-colors",
              tab === t.id ? "bg-background text-foreground shadow-sm" : "text-muted-foreground",
            )}
          >
            {t.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <EmptyState />
      ) : (
        <ul className="card-soft overflow-hidden rounded-2xl">
          {filtered.map((r, i) => (
            <li
              key={r.id}
              className={cn(
                "flex items-center gap-3 px-4 py-3",
                i !== filtered.length - 1 && "border-t border-border/60 first:border-0",
                i === 0 && "border-0",
              )}
            >
              <span
                className={cn(
                  "flex h-9 w-9 shrink-0 items-center justify-center rounded-full",
                  r.direction === "in"
                    ? "bg-[var(--positive-soft)] text-[var(--positive)]"
                    : "bg-muted text-foreground/80",
                )}
                aria-hidden
              >
                {r.direction === "in" ? (
                  <ArrowDownLeft className="h-4 w-4" />
                ) : (
                  <ArrowUpRight className="h-4 w-4" />
                )}
              </span>
              <div className="min-w-0 flex-1">
                <p className="truncate text-[14px] font-medium">{r.title}</p>
                <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-muted-foreground tabular">
                  <span>{r.id}</span>
                  <span className="h-1 w-1 rounded-full bg-border" />
                  <span>{r.date}</span>
                </div>
              </div>
              <div className="flex flex-col items-end gap-1">
                <p
                  className={cn(
                    "text-[14px] font-semibold tabular",
                    r.direction === "in" ? "text-[var(--positive)]" : "text-foreground",
                  )}
                >
                  {r.amount}
                </p>
                <StatusPill status={r.status} />
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

function StatCell({ label, value, tone }: { label: string; value: string; tone?: "brand" }) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center px-1">
      <p className="text-[11px] text-muted-foreground">{label}</p>
      <p
        className={cn(
          "mt-0.5 text-[16px] font-semibold tabular",
          tone === "brand" ? "text-[var(--brand)]" : "text-foreground",
        )}
      >
        {value}
      </p>
    </div>
  )
}

function Divider() {
  return <span aria-hidden className="mx-0.5 h-8 w-px self-center bg-border/80" />
}

function StatusPill({ status }: { status: Status }) {
  const map: Record<Status, { label: string; icon: React.ReactNode; className: string }> = {
    active: {
      label: "Active",
      icon: <CheckCircle2 className="h-2.5 w-2.5" strokeWidth={3} aria-hidden />,
      className: "bg-[var(--positive-soft)] text-[var(--positive)]",
    },
    expired: {
      label: "Expired",
      icon: <Clock className="h-2.5 w-2.5" aria-hidden />,
      className: "bg-muted text-muted-foreground",
    },
    refunded: {
      label: "Refunded",
      icon: <Undo2 className="h-2.5 w-2.5" aria-hidden />,
      className: "bg-muted text-muted-foreground",
    },
    pending: {
      label: "Pending",
      icon: <Clock className="h-2.5 w-2.5" aria-hidden />,
      className: "bg-muted text-foreground",
    },
  }
  const s = map[status]
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-1.5 py-[1px] text-[10px] font-medium",
        s.className,
      )}
    >
      {s.icon}
      {s.label}
    </span>
  )
}

function EmptyState() {
  return (
    <div className="card-soft flex flex-col items-center gap-2 rounded-2xl px-6 py-10 text-center">
      <span className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
        <Inbox className="h-5 w-5 text-muted-foreground" aria-hidden />
      </span>
      <p className="text-[13px] font-semibold">Nothing here yet</p>
      <p className="text-[12px] text-muted-foreground">Your transactions will show up here.</p>
    </div>
  )
}
