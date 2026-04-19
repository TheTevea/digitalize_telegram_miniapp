import { MiniAppFrame } from "@/components/mini-app-frame"
import { BackLink } from "@/components/back-link"
import { PlanPicker } from "@/components/plan-picker"
import { GptMark } from "@/components/service-marks"

export default function GptPlansPage() {
  return (
    <MiniAppFrame>
      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <BackLink href="/verify" />
          <span className="text-[11px] text-muted-foreground tabular">Step 2 of 3</span>
        </div>

        <header className="flex items-start gap-3 px-1">
          <GptMark />
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h1 className="text-[20px] font-semibold leading-tight tracking-tight">ChatGPT verification</h1>
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-[var(--positive)]" aria-label="Live" />
            </div>
            <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
              Pick a plan, pay, paste your session JSON. The bot assigns the key automatically.
            </p>
          </div>
        </header>

        <PlanPicker />
      </div>
    </MiniAppFrame>
  )
}
