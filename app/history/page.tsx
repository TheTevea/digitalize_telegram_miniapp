import { MiniAppFrame } from "@/components/mini-app-frame"
import { HistoryList } from "@/components/history-list"

export default function HistoryPage() {
  return (
    <MiniAppFrame>
      <div className="flex flex-col gap-3">
        <header className="px-1 pt-1">
          <h1 className="text-[22px] font-semibold leading-tight tracking-tight">Charging History</h1>
        </header>
        <HistoryList />
      </div>
    </MiniAppFrame>
  )
}
