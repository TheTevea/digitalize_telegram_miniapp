"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"

export function BackLink({ href }: { href: string; label?: string }) {
  const router = useRouter()

  useEffect(() => {
    const tg = (window as any)?.Telegram?.WebApp
    if (!tg?.BackButton) return

    tg.BackButton.show()

    function handleBack() {
      router.push(href)
    }

    tg.BackButton.onClick(handleBack)

    return () => {
      tg.BackButton.offClick(handleBack)
      tg.BackButton.hide()
    }
  }, [href, router])

  // Renders nothing — the Telegram native back button handles UI
  return null
}
