import { MiniAppFrame } from "@/components/mini-app-frame"
import { HistoryList } from "@/components/history-list"

export default function HistoryPage() {
  return (
    <MiniAppFrame>
      <div className="flex flex-col gap-3">
        <header className="px-1 pt-1">
          <h1 className="text-[22px] font-semibold leading-tight tracking-tight">History</h1>
          <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
            Every purchase, activation, and payout in one place.
          </p>
        </header>
        <HistoryList />
      </div>
    </MiniAppFrame>
  )
}
