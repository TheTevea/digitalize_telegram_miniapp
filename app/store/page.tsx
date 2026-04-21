import { Coins, Mail, Sparkle } from "lucide-react"
import { MiniAppFrame } from "@/components/mini-app-frame"
import { BackLink } from "@/components/back-link"
import { AssetRow } from "@/components/asset-row"

const items = [
  {
    id: "gpt-acc",
    name: "ChatGPT pre-verified account",
    desc: "Plus-ready email with a fresh session token",
    price: "$8.00",
    accent: "brand" as const,
    icon: <Mail className="h-5 w-5" aria-hidden />,
    badge: "Top pick",
  },
  {
    id: "gem-acc",
    name: "Gemini AI Pro bundle",
    desc: "12-month Google One · clean email included",
    price: "$12.00",
    accent: "blue" as const,
    icon: <Sparkle className="h-5 w-5" aria-hidden />,
  },
  {
    id: "topup",
    name: "VIP coins · 100 pack",
    desc: "Spend in any plan · never expires",
    price: "$5.00",
    accent: "muted" as const,
    icon: <Coins className="h-5 w-5" aria-hidden />,
  },
]

export default function StorePage() {
  return (
    <MiniAppFrame>
      <div className="flex flex-col gap-3">
        <BackLink href="/" />


        <header className="px-1">
          <h1 className="text-[22px] font-semibold leading-tight tracking-tight">Accounts & top-ups</h1>
          <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
            Buy pre-verified accounts or load up your wallet for faster checkouts.
          </p>
        </header>

        <ul className="card-soft overflow-hidden rounded-2xl">
          {items.map((i, idx) => (
            <li key={i.id} className={idx !== 0 ? "border-t border-border/60" : ""}>
              <AssetRow
                mark={
                  <span
                    className={
                      "flex h-11 w-11 items-center justify-center rounded-full " +
                      (i.accent === "brand"
                        ? "bg-[var(--brand-soft)] text-[var(--brand)]"
                        : i.accent === "blue"
                          ? "bg-[color-mix(in_oklch,#4f8cff_15%,white)] text-[color:#4f8cff]"
                          : "bg-muted text-foreground/80")
                    }
                  >
                    {i.icon}
                  </span>
                }
                title={
                  <span className="flex items-center gap-1.5">
                    {i.name}
                    {i.badge && (
                      <span className="rounded-md bg-[var(--brand)] px-1.5 py-[1px] text-[9px] font-bold uppercase tracking-wider text-[var(--brand-foreground)]">
                        {i.badge}
                      </span>
                    )}
                  </span>
                }
                subtitle={i.desc}
                value={i.price}
              />
            </li>
          ))}
        </ul>
      </div>
    </MiniAppFrame>
  )
}
