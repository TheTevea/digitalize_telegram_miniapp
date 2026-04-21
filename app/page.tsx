"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ChevronRight, List } from "lucide-react"
import { MiniAppFrame } from "@/components/mini-app-frame"
import { PillTabs } from "@/components/pill-tabs"
import { triggerTabHaptic } from "@/lib/haptic"
import { ActionTiles } from "@/components/action-tiles"
import { AssetRow } from "@/components/asset-row"
import { Sparkline } from "@/components/sparkline"
import { DeltaPill } from "@/components/delta-pill"


const iconMark = (src: string, alt: string) => (
  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-black/5">
    <Image src={src} alt={alt} width={28} height={28} className="h-7 w-7 object-contain" />
  </span>
)

const perplexityMark = (
  <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[#1a1a1a]">
    <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5" aria-hidden>
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  </span>
)

const services = [
  {
    id: "gpt",
    name: "GPT Verification",
    subtitle: "Plus · Pro · 1M / 12M",
    price: "$3.00",
    mark: iconMark("/icons/openai.webp", "OpenAI"),
    href: "/verify/gpt",
  },
  {
    id: "gemini",
    name: "Gemini Pro",
    subtitle: "Advanced AI models",
    price: "$2.00",
    mark: iconMark("/icons/gemini-color.webp", "Gemini"),
    href: "/verify",
  },
  {
    id: "claude",
    name: "Claude Pro",
    subtitle: "Premium assistance",
    price: "$9.00",
    mark: iconMark("/icons/claude-color.webp", "Claude"),
    href: "/verify",
  },
  {
    id: "perplexity",
    name: "Perplexity",
    subtitle: "Search & discovery",
    price: "$5.00",
    mark: perplexityMark,
    href: "/verify",
  },
]

const trending = [
  {
    id: "gpt-plus-1",
    name: "GPT Plus",
    price: "$3.00",
    delta: 7.01,
    series: [2.8, 2.9, 2.85, 3.1, 2.95, 3.0, 3.3, 3.0, 3.0, 4.2, 3.0],
    mark: iconMark("/icons/openai.webp", "OpenAI"),
    href: "/verify/gpt",
  },
  {
    id: "gem-pro",
    name: "Gemini Pro",
    price: "$2.00",
    delta: -4.25,
    series: [2.4, 2.35, 2.3, 2.2, 2.25, 2.1, 2.05, 2.1, 2.0, 1.95, 2.0],
    mark: iconMark("/icons/gemini-color.webp", "Gemini"),
    href: "/verify",
  },
  {
    id: "claude",
    name: "Claude Pro",
    price: "$9.00",
    delta: 2.14,
    series: [8.6, 8.7, 8.5, 8.8, 8.9, 8.7, 9.0, 8.9, 9.1, 9.0, 9.0],
    mark: iconMark("/icons/claude-color.webp", "Claude"),
    href: "/verify",
  },
  {
    id: "ppx",
    name: "Perplexity",
    price: "$5.00",
    delta: -1.32,
    series: [5.2, 5.1, 5.15, 5.05, 5.0, 4.95, 5.0, 4.9, 4.95, 5.0, 4.95],
    mark: perplexityMark,
    href: "/verify",
  },
]

export default function HomePage() {
  const [tab, setTab] = useState("verify")

  return (
    <MiniAppFrame>
      <div className="flex flex-col gap-3">
        {/* Avatar + tabs */}
        <div className="relative flex items-center justify-between py-1">
          <Image
            src="/avatar.jpg"
            alt="Your avatar"
            width={36}
            height={36}
            className="h-9 w-9 rounded-full object-cover"
            priority
          />
          <div className="absolute left-1/2 -translate-x-1/2">
            <PillTabs
              value={tab}
              onChange={(v) => { triggerTabHaptic(); setTab(v) }}
              options={[
                { value: "verify", label: "Verify" },
                { value: "account", label: "Account" },
              ]}
            />
          </div>
          <span className="h-9 w-9" aria-hidden />
        </div>

        {tab === "verify" && (
          <>
            {/* Priority AI Platform cards */}
            <section aria-labelledby="verify-title" className="card-soft overflow-hidden rounded-2xl">
              <div className="flex items-center justify-between px-4 pb-1 pt-3">
                <h2 id="verify-title" className="text-[14px] font-semibold text-[var(--brand)]">
                  Verification Services
                </h2>
                <Link href="/verify" className="text-[13px] font-semibold text-[var(--brand)]">
                  More
                </Link>
              </div>
              <ul>
                {services.map((service) => (
                  <li key={service.id} className="relative [&:not(:last-child)]:after:absolute [&:not(:last-child)]:after:bottom-0 [&:not(:last-child)]:after:left-[72px] [&:not(:last-child)]:after:right-0 [&:not(:last-child)]:after:h-px [&:not(:last-child)]:after:bg-border/70 [&:not(:last-child)]:after:content-['']">
                    <AssetRow
                      href={service.href}
                      mark={service.mark}
                      title={service.name}
                      subtitle={service.subtitle}
                      value={service.price}
                      meta="from"
                    />
                  </li>
                ))}
              </ul>
            </section>

            {/* Quick actions */}
            <ActionTiles />
          </>
        )}

        {tab === "account" && (
          <div className="flex flex-col gap-3">
            {trending.map((t) => (
              <Link
                key={t.id}
                href={t.href}
                className="press card-soft flex flex-col gap-1.5 overflow-hidden rounded-2xl px-4 py-3 hover:bg-black/[0.02]"
              >
                <div className="flex items-center justify-between gap-2">
                  <div className="shrink-0">{t.mark}</div>
                  <Sparkline data={t.series} positive={t.delta >= 0} width={80} height={30} className="opacity-90" />
                </div>
                <div className="mt-1 flex flex-col">
                  <div className="flex items-center gap-1.5">
                    <p className="text-[14px] font-semibold leading-tight">{t.name}</p>
                    <DeltaPill value={t.delta} />
                  </div>
                  <p className="mt-0.5 text-[13px] text-muted-foreground tabular">{t.price}</p>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </MiniAppFrame>
  )
}
