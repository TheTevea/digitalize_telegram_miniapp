import type { ReactNode } from "react"
import { BottomNav } from "@/components/bottom-nav"
import { PageTransition } from "@/components/page-transition"

export function MiniAppFrame({
  children,
  nopad,
}: {
  children: ReactNode
  nopad?: boolean
}) {
  return (
    <div className="relative mx-auto flex min-h-[100dvh] w-full max-w-[440px] flex-col bg-background">
      <main className={nopad ? "flex-1 pb-[100px]" : "flex-1 px-4 pb-[100px] pt-2"}>
        <PageTransition>{children}</PageTransition>
      </main>
      <BottomNav />
    </div>
  )
}
