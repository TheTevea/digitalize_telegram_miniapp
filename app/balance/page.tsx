import { MiniAppFrame } from "@/components/mini-app-frame"
import { BalanceHero } from "@/components/balance-hero"

export default function BalancePage() {
  return (
    <MiniAppFrame>
      <div className="flex flex-col gap-3">
        <header className="px-1 pt-1">
          <h1 className="text-[22px] font-semibold leading-tight tracking-tight">Balance</h1>
          <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
            Top up with Telegram Stars, crypto, or card. Auto-refill keeps verifications going.
          </p>
        </header>

        <BalanceHero />
      </div>
    </MiniAppFrame>
  )
}
