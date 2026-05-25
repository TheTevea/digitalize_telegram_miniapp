// ── Types ────────────────────────────────────────────────────────────

export type ConnectorStatus = "available" | "charging" | "offline"
export type GunType = "GB/T" | "CCS2" | "CHAdeMO" | "Type2"

export type Gun = {
  label: string
  type: GunType
  status: ConnectorStatus
}

export type Connector = {
  id: string
  pricePerKwh: number
  capacity: number
  contact: string
  guns: Gun[]
  status: "online" | "offline"
}

export type Amenity = {
  id: string
  label: string
  icon: "wifi" | "coffee" | "market" | "playground" | "restroom" | "parking"
}

export type Station = {
  id: string
  name: string
  address: string
  image: string
  distance: number
  connectorType: "DC" | "AC"
  availableConnectors: number
  totalConnectors: number
  connectors: Connector[]
  amenities: Amenity[]
  lat: number
  lng: number
}

export type SessionStatus = "charging" | "remote" | "local" | "complete"

export type ChargingSession = {
  orderId: string
  cpId: string
  location: string
  power: number
  dateTimeStart: string
  dateTimeEnd: string
  duration: string
  priceUsed: number
  status: SessionStatus
}

// ── Mock Stations ────────────────────────────────────────────────────

export const stations: Station[] = [
  {
    id: "st-001",
    name: "Bayon Market",
    address: "#1I St6A Sangkat Chroy 12110",
    image: "/station-1.svg",
    distance: 3,
    connectorType: "DC",
    availableConnectors: 1,
    totalConnectors: 2,
    lat: 11.5564,
    lng: 104.9282,
    amenities: [
      { id: "a1", label: "WiFi", icon: "wifi" },
      { id: "a2", label: "Coffee", icon: "coffee" },
      { id: "a3", label: "Market", icon: "market" },
      { id: "a4", label: "Play Ground", icon: "playground" },
    ],
    connectors: [
      {
        id: "1234567",
        pricePerKwh: 0.35,
        capacity: 120,
        contact: "012345678",
        status: "online",
        guns: [
          { label: "Gun A", type: "GB/T", status: "available" },
          { label: "Gun B", type: "GB/T", status: "available" },
        ],
      },
      {
        id: "56R65",
        pricePerKwh: 0.35,
        capacity: 120,
        contact: "012345678",
        status: "online",
        guns: [
          { label: "Gun A", type: "GB/T", status: "available" },
          { label: "Gun B", type: "GB/T", status: "charging" },
        ],
      },
    ],
  },
  {
    id: "st-002",
    name: "Toul Kork Station",
    address: "#25 St134 Khan Toul Kork",
    image: "/station-2.svg",
    distance: 5.2,
    connectorType: "DC",
    availableConnectors: 2,
    totalConnectors: 3,
    lat: 11.5742,
    lng: 104.9005,
    amenities: [
      { id: "a1", label: "WiFi", icon: "wifi" },
      { id: "a5", label: "Restroom", icon: "restroom" },
      { id: "a6", label: "Parking", icon: "parking" },
    ],
    connectors: [
      {
        id: "TK-001",
        pricePerKwh: 0.30,
        capacity: 150,
        contact: "012987654",
        status: "online",
        guns: [
          { label: "Gun A", type: "CCS2", status: "available" },
          { label: "Gun B", type: "CCS2", status: "available" },
        ],
      },
      {
        id: "TK-002",
        pricePerKwh: 0.30,
        capacity: 150,
        contact: "012987654",
        status: "online",
        guns: [
          { label: "Gun A", type: "CHAdeMO", status: "available" },
          { label: "Gun B", type: "CHAdeMO", status: "charging" },
        ],
      },
      {
        id: "TK-003",
        pricePerKwh: 0.30,
        capacity: 60,
        contact: "012987654",
        status: "offline",
        guns: [
          { label: "Gun A", type: "Type2", status: "offline" },
          { label: "Gun B", type: "Type2", status: "offline" },
        ],
      },
    ],
  },
  {
    id: "st-003",
    name: "Phnom Penh Central",
    address: "#88 Norodom Blvd, BKK1",
    image: "/station-3.svg",
    distance: 1.8,
    connectorType: "DC",
    availableConnectors: 3,
    totalConnectors: 4,
    lat: 11.5625,
    lng: 104.9310,
    amenities: [
      { id: "a1", label: "WiFi", icon: "wifi" },
      { id: "a2", label: "Coffee", icon: "coffee" },
      { id: "a5", label: "Restroom", icon: "restroom" },
      { id: "a6", label: "Parking", icon: "parking" },
    ],
    connectors: [
      {
        id: "PPC-01",
        pricePerKwh: 0.40,
        capacity: 200,
        contact: "011223344",
        status: "online",
        guns: [
          { label: "Gun A", type: "CCS2", status: "available" },
          { label: "Gun B", type: "CCS2", status: "available" },
        ],
      },
      {
        id: "PPC-02",
        pricePerKwh: 0.40,
        capacity: 200,
        contact: "011223344",
        status: "online",
        guns: [
          { label: "Gun A", type: "GB/T", status: "available" },
          { label: "Gun B", type: "GB/T", status: "charging" },
        ],
      },
    ],
  },
  {
    id: "st-004",
    name: "Riverside Charge Hub",
    address: "#5 Sisowath Quay, Daun Penh",
    image: "/station-4.svg",
    distance: 4.1,
    connectorType: "AC",
    availableConnectors: 1,
    totalConnectors: 2,
    lat: 11.5719,
    lng: 104.9320,
    amenities: [
      { id: "a2", label: "Coffee", icon: "coffee" },
      { id: "a3", label: "Market", icon: "market" },
    ],
    connectors: [
      {
        id: "RV-001",
        pricePerKwh: 0.25,
        capacity: 22,
        contact: "015667788",
        status: "online",
        guns: [
          { label: "Gun A", type: "Type2", status: "charging" },
          { label: "Gun B", type: "Type2", status: "available" },
        ],
      },
      {
        id: "RV-002",
        pricePerKwh: 0.25,
        capacity: 22,
        contact: "015667788",
        status: "offline",
        guns: [
          { label: "Gun A", type: "Type2", status: "offline" },
          { label: "Gun B", type: "Type2", status: "offline" },
        ],
      },
    ],
  },
]

// ── Mock Charging Sessions ───────────────────────────────────────────

export const chargingSessions: ChargingSession[] = [
  {
    orderId: "3445567",
    cpId: "KHPP123",
    location: "Bayon market",
    power: 100,
    dateTimeStart: "2025-10-13 07:35 PM",
    dateTimeEnd: "2025-10-13 08:35 PM",
    duration: "1h 20 Min",
    priceUsed: 25,
    status: "charging",
  },
  {
    orderId: "3445568",
    cpId: "KHPP123",
    location: "Bayon market",
    power: 100,
    dateTimeStart: "2025-10-13 07:35 PM",
    dateTimeEnd: "2025-10-13 08:35 PM",
    duration: "1h 20 Min",
    priceUsed: 25,
    status: "remote",
  },
  {
    orderId: "3445569",
    cpId: "KHPP123",
    location: "Bayon market",
    power: 100,
    dateTimeStart: "2025-10-13 07:35 PM",
    dateTimeEnd: "2025-10-13 08:35 PM",
    duration: "1h 20 Min",
    priceUsed: 25,
    status: "local",
  },
  {
    orderId: "3445570",
    cpId: "TK-001",
    location: "Toul Kork Station",
    power: 85,
    dateTimeStart: "2025-10-12 02:10 PM",
    dateTimeEnd: "2025-10-12 03:45 PM",
    duration: "1h 35 Min",
    priceUsed: 30,
    status: "complete",
  },
  {
    orderId: "3445571",
    cpId: "PPC-01",
    location: "Phnom Penh Central",
    power: 45,
    dateTimeStart: "2025-10-11 10:00 AM",
    dateTimeEnd: "2025-10-11 10:40 AM",
    duration: "40 Min",
    priceUsed: 18,
    status: "complete",
  },
  {
    orderId: "3445572",
    cpId: "RV-001",
    location: "Riverside Charge Hub",
    power: 22,
    dateTimeStart: "2025-10-10 08:00 PM",
    dateTimeEnd: "2025-10-10 10:30 PM",
    duration: "2h 30 Min",
    priceUsed: 12,
    status: "complete",
  },
]
