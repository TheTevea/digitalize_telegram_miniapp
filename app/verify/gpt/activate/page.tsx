import { BadgeCheck } from "lucide-react"
import { MiniAppFrame } from "@/components/mini-app-frame"
import { BackLink } from "@/components/back-link"
import { ActivationFlow } from "@/components/activation-flow"

export default function ActivatePage() {
  return (
    <MiniAppFrame>
      <div className="flex flex-col gap-3">
        <BackLink href="/verify/gpt" />

        <header className="px-1">
          <div className="flex items-center gap-1.5">
            <h1 className="text-[20px] font-semibold leading-tight tracking-tight">ChatGPT Plus · 1 month</h1>
            <BadgeCheck className="h-4 w-4 text-[var(--positive)]" aria-label="Verified" />
          </div>
          <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
            Follow the three-step guide and paste your session JSON. We&apos;ll activate it automatically.
          </p>
        </header>

        <ActivationFlow />
      </div>
    </MiniAppFrame>
  )
}
