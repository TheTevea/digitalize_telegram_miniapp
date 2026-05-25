"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import Script from "next/script"
import { Bell, Navigation2, Search, SlidersHorizontal, Zap } from "lucide-react"

// Phnom Penh center coordinates
const MAP_CENTER = { lat: 11.5564, lng: 104.9282 }

// Demo EV station locations in Phnom Penh
const EV_STATIONS = [
  { id: 1, lat: 11.5726, lng: 104.9120, name: "Khan Toul Kork Station", active: true },
  { id: 2, lat: 11.5489, lng: 104.9177, name: "Tuol Sangke Station", active: false },
  { id: 3, lat: 11.5628, lng: 104.9390, name: "Daun Penh Station", active: false },
  { id: 4, lat: 11.5342, lng: 104.9020, name: "Dangkao Station", active: false },
  { id: 5, lat: 11.5880, lng: 104.8950, name: "Russey Keo Station", active: false },
]

declare global {
  interface Window {
    google: typeof google
    initGoogleMap: () => void
  }
}

export function MapView() {
  const [query, setQuery] = useState("")
  const [mapsLoaded, setMapsLoaded] = useState(false)
  const mapRef = useRef<HTMLDivElement>(null)
  const mapInstanceRef = useRef<google.maps.Map | null>(null)
  const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([])

  const apiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY ?? ""

  const initMap = useCallback(() => {
    // mapInstanceRef.current is always null at this point because we clear it on unmount
    if (!mapRef.current) return

    const map = new window.google.maps.Map(mapRef.current, {
      center: MAP_CENTER,
      zoom: 13,
      mapId: "ev_charger_map",
      // Hide default UI to keep our clean look
      disableDefaultUI: true,
      gestureHandling: "greedy",
      // Custom styles — remove clutter, keep roads
      styles: [
        { featureType: "poi", stylers: [{ visibility: "off" }] },
        { featureType: "transit", stylers: [{ visibility: "off" }] },
        { featureType: "road", elementType: "labels.icon", stylers: [{ visibility: "off" }] },
        { featureType: "water", elementType: "geometry", stylers: [{ color: "#a8cde0" }] },
        { featureType: "landscape", elementType: "geometry", stylers: [{ color: "#eaf4ef" }] },
        { featureType: "road", elementType: "geometry", stylers: [{ color: "#ffffff" }] },
        { featureType: "road.arterial", elementType: "geometry", stylers: [{ color: "#f5f5f5" }] },
        { featureType: "road.highway", elementType: "geometry", stylers: [{ color: "#e8e8e8" }] },
        { featureType: "administrative", elementType: "labels.text.fill", stylers: [{ color: "#6b9e8e" }] },
      ],
    })

    mapInstanceRef.current = map

    // Add EV station markers
    EV_STATIONS.forEach((station) => {
      const pinEl = document.createElement("div")
      pinEl.innerHTML = buildPinHTML(station.active)
      pinEl.style.cursor = "pointer"
      pinEl.title = station.name

      const marker = new window.google.maps.marker.AdvancedMarkerElement({
        map,
        position: { lat: station.lat, lng: station.lng },
        content: pinEl,
        title: station.name,
      })

      markersRef.current.push(marker)
    })

    // User location dot
    const userDot = document.createElement("div")
    userDot.innerHTML = `
      <div style="position:relative;display:flex;align-items:center;justify-content:center;width:24px;height:24px;">
        <div style="position:absolute;width:24px;height:24px;border-radius:50%;background:rgba(20,180,150,0.2);animation:ping 1.5s ease-in-out infinite;"></div>
        <div style="width:14px;height:14px;border-radius:50%;background:var(--brand,#3eb8a0);border:2.5px solid white;box-shadow:0 2px 6px rgba(0,0,0,0.25);"></div>
      </div>
    `

    new window.google.maps.marker.AdvancedMarkerElement({
      map,
      position: MAP_CENTER,
      content: userDot,
      title: "Your location",
    })
  }, [])

  // On mount: if the Google Maps script was already loaded in a previous visit,
  // window.google is already available — no need to wait for onLoad again.
  useEffect(() => {
    if (typeof window !== "undefined" && window.google?.maps) {
      setMapsLoaded(true)
    }
  }, [])

  useEffect(() => {
    if (mapsLoaded) {
      initMap()
    }
  }, [mapsLoaded, initMap])

  // Cleanup on unmount so the next mount can re-initialise from scratch.
  useEffect(() => {
    return () => {
      markersRef.current = []
      mapInstanceRef.current = null
    }
  }, [])

  return (
    <div className="relative -mx-4 -mt-2 h-[calc(100dvh-80px)] w-[calc(100%+2rem)] overflow-hidden">
      {/* Google Maps Script */}
      <Script
        id="google-maps"
        strategy="afterInteractive"
        src={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=marker&v=beta`}
        onLoad={() => setMapsLoaded(true)}
      />

      {/* Map container */}
      <div ref={mapRef} className="absolute inset-0 h-full w-full" />

      {/* Loading state */}
      {!mapsLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-[#eaf4ef]">
          <div className="flex flex-col items-center gap-3">
            <div
              className="flex h-12 w-12 items-center justify-center rounded-full animate-pulse"
              style={{ background: "linear-gradient(135deg, var(--brand) 0%, var(--brand-2) 100%)" }}
            >
              <Zap className="h-6 w-6 text-white" fill="currentColor" />
            </div>
            <span className="text-sm font-medium text-muted-foreground">Loading map…</span>
          </div>
        </div>
      )}

      {/* ══════════════════════════════════════
          TOP OVERLAY — Header + Search bar
      ══════════════════════════════════════ */}
      <div className="absolute inset-x-0 top-0 z-10 px-4">
        {/* Header */}
        <div
          className="flex items-center justify-between pb-3 pt-5 px-4"
          style={{
            background:
              "linear-gradient(to bottom, rgba(255,255,255,0.97) 55%, rgba(255,255,255,0))",
          }}
        >
          {/* Title */}
          <div className="flex items-center gap-2">
            <Zap
              className="h-5 w-5 flex-shrink-0"
              style={{ color: "var(--brand)" }}
              fill="currentColor"
              aria-hidden
            />
            <h1 className="text-[18px] font-bold tracking-tight text-foreground">EV Charger</h1>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-2">
            {/* Notification bell */}
            <button
              id="map-bell-btn"
              type="button"
              aria-label="Notifications"
              className="press relative flex h-10 w-10 items-center justify-center rounded-full"
              style={{
                background: "rgba(255,255,255,0.97)",
                boxShadow:
                  "0 2px 10px -2px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.05)",
              }}
            >
              <Bell className="h-[18px] w-[18px] text-foreground/70" aria-hidden />
              {/* Badge */}
              <span
                className="absolute right-[7px] top-[7px] flex h-[14px] w-[14px] items-center justify-center rounded-full text-[9px] font-bold leading-none text-white"
                style={{ background: "var(--negative)" }}
                aria-label="1 notification"
              >
                1
              </span>
            </button>

            {/* GPS / locate button */}
            <button
              id="map-locate-btn"
              type="button"
              aria-label="My location"
              onClick={() => {
                mapInstanceRef.current?.panTo(MAP_CENTER)
                mapInstanceRef.current?.setZoom(14)
              }}
              className="press flex h-10 w-10 items-center justify-center rounded-full"
              style={{
                background: "rgba(255,255,255,0.97)",
                boxShadow:
                  "0 2px 10px -2px rgba(0,0,0,0.14), 0 0 0 1px rgba(0,0,0,0.05)",
              }}
            >
              <Navigation2
                className="h-[18px] w-[18px]"
                style={{ color: "var(--brand)" }}
                aria-hidden
              />
            </button>
          </div>
        </div>

        {/* Search bar row */}
        <div className="flex items-center gap-2 pb-4 px-4">
          {/* Search input */}
          <div
            className="relative flex flex-1 items-center rounded-full px-3"
            style={{
              background: "rgba(255,255,255,0.97)",
              boxShadow:
                "0 2px 14px -4px rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.06)",
              height: "46px",
            }}
          >
            <Search
              className="mr-2.5 h-4 w-4 flex-shrink-0 text-muted-foreground"
              aria-hidden
            />
            <input
              id="map-search-input"
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search charging station"
              className="flex-1 bg-transparent text-[14px] text-foreground placeholder:text-muted-foreground focus:outline-none"
            />
          </div>

          {/* All filter pill */}
          <button
            id="map-filter-btn"
            type="button"
            aria-label="Filter stations"
            className="press flex h-[46px] flex-shrink-0 items-center gap-1.5 rounded-full px-4 text-[13px] font-semibold"
            style={{
              background: "rgba(255,255,255,0.97)",
              boxShadow:
                "0 2px 14px -4px rgba(0,0,0,0.16), 0 0 0 1px rgba(0,0,0,0.06)",
              color: "var(--foreground)",
            }}
          >
            <SlidersHorizontal
              className="h-3.5 w-3.5 text-muted-foreground"
              aria-hidden
            />
            <span>All</span>
          </button>
        </div>
      </div>

      {/* Ping animation for user dot */}
      <style>{`
        @keyframes ping {
          0%, 100% { transform: scale(1); opacity: 0.6; }
          50% { transform: scale(1.8); opacity: 0; }
        }
      `}</style>
    </div>
  )
}

/* ─────────────────────────────────────────
   Build the teardrop pin HTML for markers
───────────────────────────────────────── */
function buildPinHTML(active: boolean): string {
  const bg = active
    ? "linear-gradient(135deg, #3eb8a0 0%, #2a8f78 100%)"
    : "rgba(80,140,125,0.78)"
  const shadow = active
    ? "0 4px 14px -3px rgba(62,184,160,0.55), 0 0 0 2.5px white"
    : "0 3px 10px -2px rgba(0,0,0,0.22), 0 0 0 2px white"
  const tailBg = active ? "#2a8f78" : "rgba(80,140,125,0.78)"

  return `
    <div style="display:flex;flex-direction:column;align-items:center;filter:drop-shadow(0 2px 4px rgba(0,0,0,0.15));">
      <div style="
        display:flex;align-items:center;justify-content:center;
        width:40px;height:40px;border-radius:50%;
        background:${bg};box-shadow:${shadow};color:white;
      ">
        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none">
          <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"/>
        </svg>
      </div>
      <div style="width:3px;height:10px;background:${tailBg};margin-top:-1px;border-radius:0 0 2px 2px;"></div>
      <div style="width:5px;height:5px;border-radius:50%;background:${tailBg};margin-top:-1px;"></div>
    </div>
  `
}
