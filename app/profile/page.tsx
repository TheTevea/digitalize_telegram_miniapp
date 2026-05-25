"use client"

import { useState } from "react"
import { Bell, ChevronRight, Globe, Headphones, LifeBuoy, Zap } from "lucide-react"
import { MiniAppFrame } from "@/components/mini-app-frame"
import { UserCard } from "@/components/user-card"
import { cn } from "@/lib/utils"

const SUPPORT_ROWS = [
  { icon: Zap, label: "Charging settings", meta: "Auto-stop · Notifications" },
  { icon: LifeBuoy, label: "Help center", meta: "FAQs · Guides" },
  { icon: Headphones, label: "Contact support", meta: "Avg. reply 8m" },
] as const

const LANGUAGE_LABELS: Record<string, string> = {
  km: "ភាសាខ្មែរ",
  en: "English",
}

export default function ProfilePage() {
  const [language, setLanguage] = useState<"km" | "en">("en")

  function handleLanguageClick() {
    const tg = (window as any)?.Telegram?.WebApp
    if (tg?.showPopup) {
      tg.showPopup(
        {
          title: "Select Language",
          message: "Choose your preferred language",
          buttons: [
            { id: "km", type: "default", text: "🇰🇭  ភាសាខ្មែរ  (Khmer)" },
            { id: "en", type: "default", text: "🇬🇧  English" },
            { id: "cancel", type: "cancel" },
          ],
        },
        (buttonId: string) => {
          if (buttonId === "km" || buttonId === "en") {
            setLanguage(buttonId)
          }
        },
      )
    } else {
      // Fallback for non-Telegram environments
      const picked = window.confirm(
        "Select language:\nOK = English\nCancel = ភាសាខ្មែរ",
      )
        ? "en"
        : "km"
      setLanguage(picked)
    }
  }

  const accountRows = [
    {
      icon: Globe,
      label: "Language",
      meta: LANGUAGE_LABELS[language],
      onClick: handleLanguageClick,
    },
    { icon: Bell, label: "Notifications", meta: "All on", onClick: undefined },
  ]

  return (
    <MiniAppFrame>
      <div className="flex flex-col gap-3">
        <UserCard />

        {/* Charging stats card */}
        <ChargingStats />

        {/* Account section */}
        <section>
          <h3 className="mb-1.5 px-1 text-[12px] font-semibold text-muted-foreground">Account</h3>
          <ul className="card-soft overflow-hidden rounded-2xl">
            {accountRows.map((row, idx) => {
              const Icon = row.icon
              return (
                <li key={row.label}>
                  <button
                    type="button"
                    onClick={row.onClick}
                    className={cn(
                      "press flex w-full items-center justify-between gap-3 px-4 py-3 text-left hover:bg-black/[0.02]",
                      idx !== accountRows.length - 1 && "border-b border-border/60",
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-foreground/80">
                        <Icon className="h-4 w-4" aria-hidden />
                      </span>
                      <span>
                        <p className="text-[14px] font-medium">{row.label}</p>
                        <p className="text-[11.5px] text-muted-foreground tabular">{row.meta}</p>
                      </span>
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" aria-hidden />
                  </button>
                </li>
              )
            })}
          </ul>
        </section>

        {/* Support section */}
        <section>
          <h3 className="mb-1.5 px-1 text-[12px] font-semibold text-muted-foreground">Charging & support</h3>
          <ul className="card-soft overflow-hidden rounded-2xl">
            {SUPPORT_ROWS.map((row, idx) => {
              const Icon = row.icon
              return (
                <li key={row.label}>
                  <button
                    type="button"
                    className={cn(
                      "press flex w-full items-center justify-between gap-3 px-4 py-3 text-left hover:bg-black/[0.02]",
                      idx !== SUPPORT_ROWS.length - 1 && "border-b border-border/60",
                    )}
                  >
                    <span className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-muted text-foreground/80">
                        <Icon className="h-4 w-4" aria-hidden />
                      </span>
                      <span>
                        <p className="text-[14px] font-medium">{row.label}</p>
                        <p className="text-[11.5px] text-muted-foreground tabular">{row.meta}</p>
                      </span>
                    </span>
                    <ChevronRight className="h-4 w-4 text-muted-foreground" aria-hidden />
                  </button>
                </li>
              )
            })}
          </ul>
        </section>

        <p className="text-center text-[11px] text-muted-foreground">
          EV Charger · v1.0.0 · Telegram mini app
        </p>
      </div>
    </MiniAppFrame>
  )
}

function ChargingStats() {
  return (
    <section className="card-soft rounded-2xl p-4">
      <p className="text-[13px] font-semibold">Charging Summary</p>
      <div className="mt-3 grid grid-cols-3 gap-2">
        <div className="flex flex-col items-center rounded-xl bg-muted/60 px-2 py-2.5">
          <p className="text-[16px] font-semibold text-[var(--brand)] tabular">852</p>
          <p className="mt-0.5 text-[10px] text-muted-foreground">Total kWh</p>
        </div>
        <div className="flex flex-col items-center rounded-xl bg-muted/60 px-2 py-2.5">
          <p className="text-[16px] font-semibold tabular">24</p>
          <p className="mt-0.5 text-[10px] text-muted-foreground">Sessions</p>
        </div>
        <div className="flex flex-col items-center rounded-xl bg-muted/60 px-2 py-2.5">
          <p className="text-[16px] font-semibold text-[var(--positive)] tabular">$42</p>
          <p className="mt-0.5 text-[10px] text-muted-foreground">Saved</p>
        </div>
      </div>
    </section>
  )
}
