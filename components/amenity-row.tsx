import type { Amenity } from "@/lib/mock-data"
import { Wifi, Coffee, Store, TreePine, Bath, ParkingCircle } from "lucide-react"

const iconMap: Record<Amenity["icon"], typeof Wifi> = {
  wifi: Wifi,
  coffee: Coffee,
  market: Store,
  playground: TreePine,
  restroom: Bath,
  parking: ParkingCircle,
}

export function AmenityRow({ amenities }: { amenities: Amenity[] }) {
  return (
    <div className="flex items-center gap-6">
      {amenities.map((amenity) => {
        const Icon = iconMap[amenity.icon]
        return (
          <div key={amenity.id} className="flex flex-col items-center gap-1">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
              <Icon className="h-5 w-5 text-foreground/70" aria-hidden />
            </span>
            <span className="text-[11px] text-muted-foreground">{amenity.label}</span>
          </div>
        )
      })}
    </div>
  )
}
