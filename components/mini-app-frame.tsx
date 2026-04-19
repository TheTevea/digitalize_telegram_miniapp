import type { ReactNode } from "react"
import { AppHeader } from "@/components/app-header"
import { BottomNav } from "@/components/bottom-nav"
import { PageTransition } from "@/components/page-transition"

export function MiniAppFrame({ children }: { children: ReactNode }) {
  return (
    <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col bg-background">
      {/* <AppHeader /> */}
      <main className="flex-1 px-4 pb-[120px] pt-2">
        <PageTransition>{children}</PageTransition>
      </main>
      <BottomNav />
    </div>
  )
}
