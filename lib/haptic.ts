/**
 * Trigger Telegram Mini App haptic feedback for tab selection.
 * Safe for Next.js SSR — returns early if `window` or the Telegram WebApp API is unavailable.
 */
export function triggerTabHaptic(): void {
  if (typeof window === "undefined") return
  ;(window as any).Telegram?.WebApp?.HapticFeedback?.selectionChanged?.()
}
