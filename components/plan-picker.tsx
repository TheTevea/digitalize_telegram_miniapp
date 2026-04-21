"use client"

import Link from "next/link"
import { useState } from "react"
import { ArrowRight, Check, ShieldCheck } from "lucide-react"
import { cn } from "@/lib/utils"

type Plan = {
  id: string
  tier: "Plus" | "Pro"
  duration: string
  accounts: number
  price: number
  strike?: number
  warranty: string
  stock: number
  stockTotal: number
  recommended?: boolean
  features: string[]
}

const plans: Plan[] = [
  {
    id: "plus-1m",
    tier: "Plus",
    duration: "1 month",
    accounts: 1,
    price: 3,
    warranty: "1M full warranty",
    stock: 235,
    stockTotal: 300,
    recommended: true,
    features: ["Instant activation", "Your own account", "Reissue on loss"],
  },
  {
    id: "plus-12m",
    tier: "Plus",
    duration: "12 months",
    accounts: 1,
    price: 30,
    strike: 36,
    warranty: "12M full warranty",
    stock: 108,
    stockTotal: 200,
    features: ["Save $6 yearly", "Your own account", "Priority reissue"],
  },
  {
    id: "pro-5x",
    tier: "Pro",
    duration: "1 month",
    accounts: 5,
    price: 45,
    warranty: "1M full warranty",
    stock: 19,
    stockTotal: 50,
    features: ["5 shared seats", "Pro features", "Reissue on loss"],
  },
  {
    id: "pro-20x",
    tier: "Pro",
    duration: "1 month",
    accounts: 20,
    price: 80,
    warranty: "1M full warranty",
    stock: 22,
    stockTotal: 50,
    features: ["20 shared seats", "Best team value", "Priority reissue"],
  },
]

export function PlanPicker() {
  const [selected, setSelected] = useState<string>("plus-1m")
  const active = plans.find((p) => p.id === selected) ?? plans[0]

  return (
    <div className="flex flex-col gap-2.5 pb-4">
      <ul role="radiogroup" aria-label="Plans" className="flex flex-col gap-2">
        {plans.map((p) => {
          const isSelected = p.id === selected
          const stockPct = Math.round((p.stock / p.stockTotal) * 100)
          const lowStock = p.stock <= 25
          return (
            <li key={p.id}>
              <button
                type="button"
                role="radio"
                aria-checked={isSelected}
                onClick={() => setSelected(p.id)}
                className={cn(
                  "card-soft press relative w-full rounded-2xl p-4 text-left transition",
                  isSelected
                    ? "outline outline-2 outline-[var(--brand)] outline-offset-2 bg-[var(--brand)]/[0.04]"
                    : "outline outline-2 outline-transparent",
                )}
              >
                {p.recommended && (
                  <span className="absolute -top-2 left-3 inline-flex items-center rounded-full bg-[var(--brand)] px-2 py-0.5 text-[9px] font-semibold uppercase tracking-wider text-[var(--brand-foreground)]">
                    Recommended
                  </span>
                )}

                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5">
                      <span
                        className={cn(
                          "rounded-md px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wider",
                          p.tier === "Pro"
                            ? "bg-[var(--brand-soft)] text-[var(--brand)]"
                            : "bg-muted text-muted-foreground",
                        )}
                      >
                        {p.tier}
                      </span>
                      {p.accounts > 1 && (
                        <span className="rounded-md bg-muted px-1.5 py-0.5 text-[10px] font-semibold text-muted-foreground">
                          {p.accounts}× seats
                        </span>
                      )}
                    </div>
                    <p className="mt-1.5 text-[14px] font-semibold leading-tight">
                      ChatGPT {p.tier} · {p.duration}
                    </p>
                    <p className="mt-0.5 text-[12px] text-muted-foreground">{p.warranty}</p>
                  </div>

                  <div className="flex flex-col items-end gap-1.5">
                    <div className="flex items-baseline gap-1">
                      {p.strike && (
                        <span className="text-[11px] text-muted-foreground line-through tabular">${p.strike}</span>
                      )}
                      <span className="text-[22px] font-semibold leading-none tabular">${p.price}</span>
                    </div>
                    <span
                      className={cn(
                        "flex h-5 w-5 items-center justify-center rounded-full border-2 transition-colors",
                        isSelected ? "border-[var(--brand)] bg-[var(--brand)]" : "border-border bg-background",
                      )}
                      aria-hidden
                    >
                      {isSelected && <Check className="h-3 w-3 text-[var(--brand-foreground)]" strokeWidth={3.5} />}
                    </span>
                  </div>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <div className="h-1 flex-1 overflow-hidden rounded-full bg-muted">
                    <div
                      className={cn(
                        "h-full rounded-full transition-[width] duration-500",
                        lowStock ? "bg-[var(--negative)]" : "bg-[var(--brand)]",
                      )}
                      style={{ width: `${stockPct}%` }}
                    />
                  </div>
                  <p className="text-[11px] text-muted-foreground tabular">
                    <span className={cn(lowStock && "font-semibold text-[var(--negative)]")}>{p.stock}</span>
                    <span className="opacity-60"> / {p.stockTotal}</span>
                  </p>
                </div>

                {isSelected && (
                  <ul className="mt-3 flex flex-col gap-1.5 border-t border-border/70 pt-3 fade-up">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-center gap-2 text-[12.5px]">
                        <Check className="h-3 w-3 text-[var(--brand)]" strokeWidth={3} aria-hidden />
                        {f}
                      </li>
                    ))}
                  </ul>
                )}
              </button>
            </li>
          )
        })}
      </ul>

      <div className="card-soft flex items-center gap-2 rounded-2xl px-3 py-2.5 text-[12px] text-muted-foreground">
        <ShieldCheck className="h-4 w-4 text-[var(--brand)]" aria-hidden />
        <span>VetVerify Guarantee — full reissue if benefits drop during active period.</span>
      </div>

      <div className="sticky bottom-[96px] z-10 -mx-4 px-4 pt-1">
        <Link
          href={`/verify/gpt/activate?plan=${active.id}`}
          className="press flex items-center justify-between gap-3 rounded-2xl bg-[var(--brand)] px-5 py-3.5 text-[var(--brand-foreground)] shadow-[0_10px_28px_-10px_color-mix(in_oklch,var(--brand)_55%,transparent)]"
        >
          <span className="flex flex-col leading-tight">
            <span className="text-[11px] opacity-80">Continue</span>
            <span className="text-[15px] font-semibold">
              ChatGPT {active.tier} · {active.duration}
            </span>
          </span>
          <span className="flex items-center gap-1.5 rounded-full bg-[var(--brand-foreground)]/15 px-3 py-1.5 text-[13px] font-semibold tabular">
            ${active.price}
            <ArrowRight className="h-3.5 w-3.5" aria-hidden />
          </span>
        </Link>
      </div>
    </div>
  )
}
