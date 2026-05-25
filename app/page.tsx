"use client"

import { MiniAppFrame } from "@/components/mini-app-frame"
import { MapView } from "@/components/map-view"

export default function HomePage() {
  return (
    <MiniAppFrame nopad>
      <MapView />
    </MiniAppFrame>
  )
}
