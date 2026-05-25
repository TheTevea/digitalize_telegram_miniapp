import { cn } from "@/lib/utils"
import type { Connector, ConnectorStatus } from "@/lib/mock-data"
import { Settings2 } from "lucide-react"

export function ConnectorCard({ connector }: { connector: Connector }) {
  return (
    <div className="card-soft overflow-hidden rounded-2xl">
      {/* Header */}
      <div className="flex items-center justify-between px-4 pt-3 pb-2">
        <p className="text-[14px] font-semibold tabular">ID:{connector.id}</p>
        <StatusLabel status={connector.status === "online" ? "online" : "offline"} />
      </div>

      {/* Price & Capacity */}
      <div className="flex items-center justify-between px-4 pb-1">
        <div>
          <p className="text-[12px] text-muted-foreground">
            Price per : <span className="font-medium text-foreground">${connector.pricePerKwh.toFixed(2)} Kwh</span>
          </p>
          <p className="text-[12px] text-muted-foreground">
            Capacity : <span className="font-medium text-foreground">{connector.capacity} Kwh</span>
          </p>
        </div>
        <p className="text-right text-[12px] text-muted-foreground">
          Contact : <span className="font-medium text-foreground">{connector.contact}</span>
        </p>
      </div>

      {/* Dashed separator */}
      <div className="mx-4 my-2">
        <hr className="dashed-separator" />
      </div>

      {/* Guns — each in a column */}
      <div className="grid grid-cols-2 gap-3 px-4 pb-4">
        {connector.guns.map((gun, idx) => (
          <div key={idx} className="flex flex-col items-center gap-2">
            <div className="flex items-center gap-1.5 text-[12px] text-muted-foreground">
              <Settings2 className="h-3.5 w-3.5" aria-hidden />
              <span>{gun.label}: {gun.type}</span>
            </div>
            <GunButton status={gun.status} />
          </div>
        ))}
      </div>
    </div>
  )
}

function StatusLabel({ status }: { status: "online" | "offline" }) {
  return (
    <span
      className={cn(
        "text-[13px] font-semibold",
        status === "online" ? "text-[var(--brand)]" : "text-muted-foreground",
      )}
    >
      {status === "online" ? "Online" : "Offline"}
    </span>
  )
}

function GunButton({ status }: { status: ConnectorStatus }) {
  if (status === "available") {
    return (
      <button
        type="button"
        className="press w-full rounded-full border border-[var(--brand)] bg-transparent px-4 py-1.5 text-[12px] font-medium text-[var(--brand)]"
      >
        Available
      </button>
    )
  }

  if (status === "charging") {
    return (
      <button
        type="button"
        className="press w-full rounded-full border-transparent bg-[var(--negative)] px-4 py-1.5 text-[12px] font-semibold text-white"
      >
        Charging
      </button>
    )
  }

  // offline
  return (
    <button
      type="button"
      disabled
      className="w-full rounded-full border border-border bg-muted px-4 py-1.5 text-[12px] font-medium text-muted-foreground"
    >
      Offline
    </button>
  )
}

export function StartChargeButton() {
  return (
    <button
      type="button"
      className="press w-full rounded-full bg-[var(--brand)] px-4 py-1.5 text-[12px] font-semibold text-[var(--brand-foreground)]"
    >
      Start Charge
    </button>
  )
}
