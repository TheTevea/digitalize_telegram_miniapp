import Image from "next/image"
import { BadgeCheck } from "lucide-react"
import { MiniAppFrame } from "@/components/mini-app-frame"
import { BackLink } from "@/components/back-link"
import { PlanPicker } from "@/components/plan-picker"

export default function GptPlansPage() {
  return (
    <MiniAppFrame>
      <div className="flex flex-col gap-5">
        <BackLink href="/verify" />

        <header className="flex items-start gap-3 px-1">
          <span className="flex h-11 w-11 items-center justify-center rounded-full bg-white shadow-sm ring-1 ring-black/5">
            <Image src="/icons/openai.webp" alt="OpenAI" width={28} height={28} className="h-7 w-7 object-contain" />
          </span>
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <h1 className="text-[20px] font-semibold leading-tight tracking-tight">ChatGPT Verification</h1>
              <BadgeCheck className="h-4 w-4 text-[var(--positive)]" aria-label="Verified" />
            </div>
            <p className="mt-1 text-[13px] leading-relaxed text-muted-foreground">
              Pick a plan, pay, paste your session JSON.
            </p>
          </div>
        </header>

        <PlanPicker />
      </div>
    </MiniAppFrame>
  )
}
