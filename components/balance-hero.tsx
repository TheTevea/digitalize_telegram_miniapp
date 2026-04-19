"use client"

import { useState } from "react"
import {
  ArrowDownLeft,
  ArrowUpRight,
  CreditCard,
  Gift,
  Plus,
  Sparkles,
  Zap,
} from "lucide-react"
import { cn } from "@/lib/utils"

const presets = [5, 10, 25, 50]

export function BalanceHero() {
  const [amount, setAmount] = useState<number>(10)

  return (
    <div className="flex flex-col gap-3">
      {/* Wallet card — premium brand-tinted hero */}
      <section
        aria-label="Wallet balance"
        className="relative overflow-hidden rounded-2xl p-4 text-[var(--brand-foreground)] shadow-[0_12px_28px_-12px_color-mix(in_oklch,var(--brand)_60%,transparent)]"
        style={{
          background:
            "linear-gradient(135deg, var(--brand) 0%, color-mix(in oklch, var(--brand) 78%, black) 100%)",
        }}
      >
        <div
          aria-hidden
          className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full opacity-25"
          style={{ background: "radial-gradient(circle, white 0%, transparent 60%)" }}
        />

        <div className="flex items-center justify-between">
          <p className="text-[12px] opacity-85">Available balance</p>
          <span className="inline-flex items-center gap-1 rounded-full bg-white/15 px-2 py-0.5 text-[11px] font-medium backdrop-blur">
            <Zap className="h-3 w-3" aria-hidden /> Auto-refill off
          </span>
        </div>

        <p className="mt-2 text-[44px] font-semibold leading-none tabular tracking-tight">
          <span className="opacity-60">$</span>12
          <span className="opacity-60">.40</span>
        </p>
        <p className="mt-2 flex items-center gap-1.5 text-[12px] opacity-85">
          <span className="inline-flex h-1.5 w-1.5 rounded-full bg-white" />
          128 VIP Coins · $1 ≈ 10 coins
        </p>

        <div className="mt-4 grid grid-cols-2 gap-2">
          <button
            type="button"
            className="press flex items-center justify-center gap-1.5 rounded-full bg-white py-2.5 text-[13px] font-semibold text-[var(--brand)]"
          >
            <Plus className="h-4 w-4" aria-hidden />
            Top up
          </button>
          <button
            type="button"
            className="press flex items-center justify-center gap-1.5 rounded-full bg-white/15 py-2.5 text-[13px] font-medium backdrop-blur"
          >
            <ArrowUpRight className="h-4 w-4" aria-hidden />
            Withdraw
          </button>
        </div>
      </section>

      {/* Quick top-up */}
      <section aria-label="Quick top-up" className="card-soft rounded-2xl p-4">
        <div className="flex items-center justify-between">
          <p className="text-[13px] font-semibold">Quick top-up</p>
          <p className="text-[11px] text-muted-foreground tabular">USD</p>
        </div>

        <div className="mt-3 grid grid-cols-4 gap-2">
          {presets.map((v) => {
            const active = v === amount
            return (
              <button
                key={v}
                type="button"
                onClick={() => setAmount(v)}
                className={cn(
                  "press flex flex-col items-center gap-0.5 rounded-xl py-2.5 text-foreground transition-colors",
                  active
                    ? "bg-[var(--brand)] text-[var(--brand-foreground)]"
                    : "bg-muted hover:bg-muted/70",
                )}
              >
                <span className="text-[15px] font-semibold leading-none tabular">${v}</span>
                <span className={cn("text-[10px]", active ? "opacity-80" : "text-muted-foreground")}>
                  {v * 10} coins
                </span>
              </button>
            )
          })}
        </div>

        <div className="mt-3 grid grid-cols-3 gap-2">
          <Method icon={<Sparkles className="h-3.5 w-3.5" aria-hidden />} label="Stars" active />
          <Method icon={<CreditCard className="h-3.5 w-3.5" aria-hidden />} label="Card" />
          <Method icon={<Gift className="h-3.5 w-3.5" aria-hidden />} label="Crypto" />
        </div>

        <button
          type="button"
          className="press mt-3 flex h-12 w-full items-center justify-center gap-2 rounded-full bg-[var(--brand)] text-[14px] font-semibold text-[var(--brand-foreground)] shadow-[0_10px_28px_-10px_color-mix(in_oklch,var(--brand)_55%,transparent)]"
        >
          Pay ${amount} with Telegram Stars
        </button>
      </section>

      {/* Recent activity */}
      <section aria-label="Recent activity">
        <h3 className="mb-1.5 px-1 text-[13px] font-semibold">Recent activity</h3>
        <ul className="card-soft overflow-hidden rounded-2xl">
          <WalletRow label="Top-up · Stars" amount="+$5.00" date="Apr 15" positive />
          <WalletRow label="GPT Plus · 1mo" amount="−$3.00" date="Apr 17" />
          <WalletRow label="Referral · @arun" amount="+$0.50" date="Apr 10" positive last />
        </ul>
      </section>
    </div>
  )
}

function Method({
  icon,
  label,
  active,
}: {
  icon: React.ReactNode
  label: string
  active?: boolean
}) {
  return (
    <button
      type="button"
      className={cn(
        "press flex items-center justify-center gap-1 rounded-full py-2 text-[12px] font-medium transition-colors",
        active
          ? "bg-[var(--brand-soft)] text-[var(--brand)] ring-1 ring-[var(--brand)]/30"
          : "bg-muted text-muted-foreground hover:text-foreground",
      )}
    >
      {icon}
      {label}
    </button>
  )
}

function WalletRow({
  label,
  amount,
  date,
  positive,
  last,
}: {
  label: string
  amount: string
  date: string
  positive?: boolean
  last?: boolean
}) {
  return (
    <li className={cn("flex items-center gap-3 px-4 py-3", !last && "border-b border-border/60")}>
      <span
        className={cn(
          "flex h-8 w-8 items-center justify-center rounded-full",
          positive ? "bg-[var(--positive-soft)] text-[var(--positive)]" : "bg-muted text-foreground/80",
        )}
        aria-hidden
      >
        {positive ? <ArrowDownLeft className="h-3.5 w-3.5" /> : <ArrowUpRight className="h-3.5 w-3.5" />}
      </span>
      <div className="flex-1">
        <p className="text-[13.5px]">{label}</p>
        <p className="text-[11px] text-muted-foreground tabular">{date}</p>
      </div>
      <p
        className={cn(
          "text-[13.5px] font-semibold tabular",
          positive ? "text-[var(--positive)]" : "text-foreground",
        )}
      >
        {amount}
      </p>
    </li>
  )
}
