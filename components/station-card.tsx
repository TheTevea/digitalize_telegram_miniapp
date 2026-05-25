import Link from "next/link"
import Image from "next/image"
import { MapPin } from "lucide-react"
import type { Station } from "@/lib/mock-data"

export function StationCard({ station }: { station: Station }) {
  return (
    <Link
      href={`/station/${station.id}`}
      className="press card-soft flex items-center gap-3 overflow-hidden rounded-2xl p-3"
    >
      {/* Thumbnail */}
      <div className="relative h-[90px] w-[110px] shrink-0 overflow-hidden rounded-xl bg-muted">
        <Image
          src={station.image}
          alt={station.name}
          fill
          className="object-cover"
          sizes="110px"
        />
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <h3 className="truncate text-[15px] font-semibold leading-tight">{station.name}</h3>
        <p className="mt-0.5 truncate text-[12px] text-muted-foreground">{station.address}</p>

        <div className="mt-2.5 flex items-center gap-3">
          {/* Connector badge */}
          <span className="inline-flex items-center gap-1 rounded-full bg-[var(--brand)] px-2 py-0.5 text-[11px] font-bold text-[var(--brand-foreground)]">
            {station.connectorType}
          </span>
          <span className="text-[12px] font-medium text-foreground tabular">
            {station.availableConnectors}/{station.totalConnectors}
          </span>

          {/* Distance */}
          <span className="ml-auto flex items-center gap-1 text-[12px] font-medium text-[var(--brand)]">
            <MapPin className="h-3.5 w-3.5" aria-hidden />
            {station.distance} Km
          </span>
        </div>
      </div>
    </Link>
  )
}
