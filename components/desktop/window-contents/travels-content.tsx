"use client"

import { useMemo, useState } from "react"
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps"
import { travelPlaces, type TravelPlace } from "@/lib/travels-data"

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

const VISITED_COLOR = "#b86b3e"

function radiusFor(place: TravelPlace) {
  if (place.lived) return 6.5
  const visits = place.visits ?? 1
  return Math.min(3 + Math.sqrt(visits) * 1.3, 8)
}

function densityColorFor(place: TravelPlace) {
  // Living somewhere counts as maximum density on the same scale as visit count.
  const t = place.lived ? 1 : Math.min((place.visits ?? 1) / 10, 1)
  const from = [232, 201, 160]
  const to = [138, 45, 18]
  const rgb = from.map((c, i) => Math.round(c + (to[i] - c) * t))
  return `rgb(${rgb.join(",")})`
}

export function TravelsContent() {
  const [view, setView] = useState<"places" | "density">("places")
  const [selected, setSelected] = useState<TravelPlace | null>(null)

  const countryCount = useMemo(() => new Set(travelPlaces.map((p) => p.country)).size, [])
  const usStateCount = useMemo(
    () => new Set(travelPlaces.filter((p) => p.country === "United States" && p.state).map((p) => p.state)).size,
    [],
  )

  return (
    <div className="space-y-3 bg-[#f4efe2] p-4 text-[#252525]">
      <p className="text-center text-sm leading-relaxed">
        Places I&apos;ve been and places that inspired me along the way.
      </p>

      <div className="space-y-2 text-center">
        <div className="text-base font-bold text-[#403b32]">
          {usStateCount} US states · {countryCount} countries
        </div>
        <div className="flex justify-center gap-1">
          <button
            onClick={() => setView("places")}
            className={`border-2 border-[#403b32] px-3 py-1 text-xs font-bold transition-colors ${
              view === "places" ? "bg-[#403b32] text-[#f4efe2]" : "bg-[#fffaf0] text-[#252525] hover:bg-white"
            }`}
          >
            Places
          </button>
          <button
            onClick={() => setView("density")}
            className={`border-2 border-[#403b32] px-3 py-1 text-xs font-bold transition-colors ${
              view === "density" ? "bg-[#403b32] text-[#f4efe2]" : "bg-[#fffaf0] text-[#252525] hover:bg-white"
            }`}
          >
            Density
          </button>
        </div>
      </div>

      <div
        className="border-2 border-[#403b32] bg-[#fffaf0] shadow-[3px_3px_0_#403b32]"
        style={{ aspectRatio: "800 / 305", overflow: "hidden" }}
      >
        <ComposableMap
          projection="geoEqualEarth"
          projectionConfig={{ scale: 140 }}
          width={800}
          height={450}
          style={{ width: "100%", height: "auto", display: "block" }}
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill="#ddd4bd"
                  stroke="#403b32"
                  strokeWidth={0.4}
                  style={{
                    default: { outline: "none" },
                    hover: { outline: "none", fill: "#ddd4bd" },
                    pressed: { outline: "none" },
                  }}
                />
              ))
            }
          </Geographies>

          {travelPlaces.map((place) => (
            <Marker
              key={place.name}
              coordinates={[place.lon, place.lat]}
              onMouseEnter={() => setSelected(place)}
              onClick={() => setSelected(place)}
            >
              {/* Oversized invisible hit area so small dots stay easy to hover/tap */}
              <circle r={radiusFor(place) + 5} fill="transparent" style={{ cursor: "pointer" }} />
              <circle
                r={radiusFor(place)}
                fill={view === "density" ? densityColorFor(place) : VISITED_COLOR}
                stroke="#2a2a2a"
                strokeWidth={0.6}
                opacity={0.9}
                style={{ cursor: "pointer", pointerEvents: "none" }}
              />
            </Marker>
          ))}
        </ComposableMap>
      </div>

      <div className="min-h-[24px] text-center text-sm font-bold text-[#403b32]">
        {selected ? `${selected.name}, ${selected.country}` : ""}
      </div>
    </div>
  )
}

export default TravelsContent
