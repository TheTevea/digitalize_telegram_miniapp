import { MiniAppFrame } from "@/components/mini-app-frame"
import { BackLink } from "@/components/back-link"
import { ActivationFlow } from "@/components/activation-flow"

export default function ActivatePage() {
  return (
    <MiniAppFrame>
      <div className="flex flex-col gap-3">
        <BackLink href="/verify/gpt" />
        <div className="flex justify-end">
          <span className="text-[11px] text-muted-foreground tabular">Step 3 of 3</span>
        </div>

        <header className="px-1">
          <h1 className="text-[22px] font-semibold leading-tight tracking-tight">
            ChatGPT Plus · 1 month
          </h1>
          <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
            Follow the three-step guide and paste your session JSON. We&apos;ll activate it automatically.
          </p>
        </header>

        <ActivationFlow />
      </div>
    </MiniAppFrame>
  )
}
