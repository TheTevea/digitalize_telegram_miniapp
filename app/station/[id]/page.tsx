import Image from "next/image"
import Link from "next/link"
import { ArrowLeft, MapPin } from "lucide-react"
import { MiniAppFrame } from "@/components/mini-app-frame"
import { AmenityRow } from "@/components/amenity-row"
import { ConnectorCard } from "@/components/connector-card"
import { stations } from "@/lib/mock-data"

export default async function StationDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const station = stations.find((s) => s.id === id) ?? stations[0]

  const availableCount = station.connectors.filter(
    (c) => c.status === "online"
  ).length


  return (
    <MiniAppFrame>
      <div className="fade-up flex flex-col gap-4">
        {/* Hero image area */}
        <div className="relative -mx-4 -mt-2 h-[220px] overflow-hidden bg-muted">
          {/* Back button */}
          <Link
            href="/station"
            className="press absolute left-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full"
            style={{
              background: "rgba(0,0,0,0.35)",
              backdropFilter: "blur(8px)",
            }}
          >
            <ArrowLeft className="h-5 w-5 text-white" aria-hidden />
          </Link>

          {/* Station images carousel */}
          <div className="flex h-full w-full items-center overflow-x-auto">
            {[station.image, station.image, station.image].map((img, idx) => (
              <div key={idx} className="relative h-full w-[85%] shrink-0">
                <Image
                  src={img}
                  alt={`${station.name} photo ${idx + 1}`}
                  fill
                  className="object-cover"
                  priority={idx === 0}
                />
              </div>
            ))}
          </div>
        </div>

        {/* Station info card */}
        <div className="card-soft -mt-6 relative z-10 rounded-t-3xl px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-[18px] font-semibold tracking-tight">
              {station.name}
            </h1>
            <span className="flex items-center gap-1 text-[13px] font-medium text-[var(--brand)]">
              <MapPin className="h-4 w-4" aria-hidden />
              {station.distance} Km
            </span>
          </div>

          {/* Dashed separator */}
          <div className="my-3">
            <hr className="dashed-separator" />
          </div>

          {/* Amenities */}
          <div>
            <p className="mb-2 text-[13px] font-medium text-muted-foreground">
              Amenities
            </p>
            <AmenityRow amenities={station.amenities} />
          </div>
        </div>

        {/* Connectors */}
        <div>
          <h2 className="mb-3 px-1 text-[16px] font-semibold">
            Connector Available : {availableCount}
          </h2>
          <div className="flex flex-col gap-3">
            {station.connectors.map((connector) => (
              <ConnectorCard key={connector.id} connector={connector} />
            ))}
          </div>
        </div>
      </div>
    </MiniAppFrame>
  )
}
