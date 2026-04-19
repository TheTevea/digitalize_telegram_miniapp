"use client"

import Image from "next/image"
import Link from "next/link"
import { useState } from "react"
import { ChevronRight, List } from "lucide-react"
import { MiniAppFrame } from "@/components/mini-app-frame"
import { PillTabs } from "@/components/pill-tabs"
import { ActionTiles } from "@/components/action-tiles"
import { AssetRow } from "@/components/asset-row"
import { Sparkline } from "@/components/sparkline"
import { DeltaPill } from "@/components/delta-pill"
import { GptMark, GeminiMark, ClaudeMark, PerplexityMark } from "@/components/service-marks"

const services = [
  {
    id: "gpt",
    name: "GPT Verification",
    subtitle: "Plus · Pro · 1M / 12M",
    price: "$3.00",
    mark: <GptMark />,
    href: "/verify/gpt",
  },
  {
    id: "gemini",
    name: "Gemini Pro",
    subtitle: "Advanced AI models",
    price: "$2.00",
    mark: <GeminiMark />,
    href: "/verify",
  },
  {
    id: "claude",
    name: "Claude Pro",
    subtitle: "Premium assistance",
    price: "$9.00",
    mark: <ClaudeMark />,
    href: "/verify",
  },
  {
    id: "perplexity",
    name: "Perplexity",
    subtitle: "Search & discovery",
    price: "$5.00",
    mark: <PerplexityMark />,
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
    mark: <GptMark />,
    href: "/verify/gpt",
  },
  {
    id: "gem-pro",
    name: "Gemini Pro",
    price: "$2.00",
    delta: -4.25,
    series: [2.4, 2.35, 2.3, 2.2, 2.25, 2.1, 2.05, 2.1, 2.0, 1.95, 2.0],
    mark: <GeminiMark />,
    href: "/verify",
  },
  {
    id: "claude",
    name: "Claude Pro",
    price: "$9.00",
    delta: 2.14,
    series: [8.6, 8.7, 8.5, 8.8, 8.9, 8.7, 9.0, 8.9, 9.1, 9.0, 9.0],
    mark: <ClaudeMark />,
    href: "/verify",
  },
  {
    id: "ppx",
    name: "Perplexity",
    price: "$5.00",
    delta: -1.32,
    series: [5.2, 5.1, 5.15, 5.05, 5.0, 4.95, 5.0, 4.9, 4.95, 5.0, 4.95],
    mark: <PerplexityMark />,
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
              onChange={setTab}
              options={[
                { value: "verify", label: "Verify" },
                { value: "account", label: "Account" },
              ]}
            />
          </div>
          <span className="h-9 w-9" aria-hidden />
        </div>

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
              <li key={service.id}>
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

        {/* Accounts & top-ups */}
        <ul className="card-soft overflow-hidden rounded-2xl">
          <AssetRow
            href="/store"
            mark={
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-[color-mix(in_oklch,var(--brand)_10%,white)]">
                <svg viewBox="0 0 24 24" fill="none" className="h-5 w-5 text-[var(--brand)]" aria-hidden>
                  <path d="M4 17l5-6 4 4 7-9" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                  <path d="M14 6h6v6" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            }
            title="Accounts & top-ups"
            subtitle="Ready-to-go verified accounts"
          />
        </ul>

        {/* Trending */}
        <section aria-labelledby="trending-title" className="card-soft overflow-hidden rounded-2xl">
          <div className="flex items-center justify-between px-4 pb-1 pt-3">
            <h3 id="trending-title" className="text-[14px] font-semibold text-[var(--brand)]">
              Trending
            </h3>
            <Link href="/verify" className="text-[13px] font-semibold text-[var(--brand)]">
              More
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-0">
            {trending.map((t) => (
              <Link
                key={t.id}
                href={t.href}
                className="press flex flex-col gap-1.5 px-4 py-3 hover:bg-black/[0.02]"
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
        </section>

        {/* Transaction history entry */}
        <ul className="card-soft overflow-hidden rounded-2xl">
          <AssetRow
            href="/history"
            mark={
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-muted">
                <List className="h-5 w-5 text-foreground/80" aria-hidden />
              </span>
            }
            title="Transaction history"
            trailing={<ChevronRight className="ml-1 h-4 w-4 shrink-0 text-muted-foreground/80" aria-hidden />}
            highlight
          />
        </ul>
      </div>
    </MiniAppFrame>
  )
}
