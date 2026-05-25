import { cn } from "@/lib/utils"
import type { ChargingSession, SessionStatus } from "@/lib/mock-data"

export function ChargingOrderCard({ session }: { session: ChargingSession }) {
  return (
    <div className="card-soft overflow-hidden rounded-2xl px-4 py-3">
      {/* Header: Order ID + Status */}
      <div className="flex items-center justify-between">
        <p className="text-[14px] font-semibold">Order :{session.orderId}</p>
        <SessionStatusLabel status={session.status} />
      </div>

      {/* Details */}
      <p className="mt-1 text-[12px] text-muted-foreground">CP ID : {session.cpId}</p>
      <div className="mt-0.5 flex items-center justify-between">
        <p className="text-[12px] text-muted-foreground">
          Location : {session.location}
        </p>
        <p className="text-[12px] text-muted-foreground">
          Power : <span className="font-medium text-foreground">{session.power} Kwh</span>
        </p>
      </div>
      <p className="mt-0.5 text-[12px] text-muted-foreground">
        DateTime : {session.dateTimeStart} - {session.dateTimeEnd}
      </p>

      {/* Dashed separator */}
      <div className="my-2">
        <hr className="dashed-separator" />
      </div>

      {/* Footer: Duration + Price */}
      <div className="flex items-center justify-between">
        <p className="text-[12px] text-muted-foreground">
          Duration : <span className="font-medium text-foreground">{session.duration}</span>
        </p>
        <p className="text-[12px] text-muted-foreground">
          Price Used : <span className="font-semibold text-[var(--brand)]">${session.priceUsed}</span>
        </p>
      </div>
    </div>
  )
}

function SessionStatusLabel({ status }: { status: SessionStatus }) {
  const map: Record<SessionStatus, { label: string; className: string }> = {
    charging: {
      label: "Charging",
      className: "text-[var(--warning)]",
    },
    remote: {
      label: "Remote",
      className: "text-foreground",
    },
    local: {
      label: "Local",
      className: "text-foreground",
    },
    complete: {
      label: "Complete",
      className: "text-[var(--positive)]",
    },
  }

  const s = map[status]

  return (
    <span className={cn("text-[13px] font-medium", s.className)}>
      {s.label}
    </span>
  )
}
