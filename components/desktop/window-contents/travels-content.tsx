"use client"

import { useMemo, useState } from "react"
import { ComposableMap, Geographies, Geography, Marker } from "react-simple-maps"
import { geoEqualEarth } from "d3-geo"
import { hexbin as d3Hexbin } from "d3-hexbin"
import { scaleQuantize } from "d3-scale"
import { travelPlaces, type TravelPlace } from "@/lib/travels-data"

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"
const MAP_WIDTH = 800
const MAP_HEIGHT = 450
const PLACE_COLOR = "#b8452f"
const HEX_RADIUS = 5

// Matches the projection react-simple-maps builds internally for this
// ComposableMap (geoEqualEarth, same scale, centered translate), so hex
// bins line up with where the land and Markers actually render.
const projection = geoEqualEarth()
  .scale(140)
  .translate([MAP_WIDTH / 2, MAP_HEIGHT / 2])

const HEX_COLORS = ["#f6efe1", "#eddcbb", "#e2c293", "#d4a473", "#c2824f", "#ab5f37", "#8f4228", "#6e2817"]
const LIVED_COLOR = HEX_COLORS[HEX_COLORS.length - 1]

interface HexPoint {
  x: number
  y: number
  place: TravelPlace
}

export function TravelsContent() {
  const [view, setView] = useState<"places" | "density">("places")
  const [selected, setSelected] = useState<TravelPlace | null>(null)

  const countryCount = useMemo(() => new Set(travelPlaces.map((p) => p.country)).size, [])
  const usStateCount = useMemo(
    () => new Set(travelPlaces.filter((p) => p.country === "United States" && p.state).map((p) => p.state)).size,
    [],
  )

  const hexBins = useMemo(() => {
    const points: HexPoint[] = travelPlaces.map((place) => {
      const [x, y] = projection([place.lon, place.lat]) ?? [0, 0]
      return { x, y, place }
    })

    const bins = d3Hexbin<HexPoint>()
      .x((d) => d.x)
      .y((d) => d.y)
      .radius(HEX_RADIUS)(points)

    // "Lived here" is a different kind of time spent than visiting, so it always
    // gets the darkest tier regardless of visit count — Algarve (20+ short
    // trips) shouldn't read the same as Lisbon (lived there for years).
    //
    // Everywhere else is colored by actual visit-count magnitude (log-scaled,
    // domain capped at the highest non-lived count so that cap — not the
    // lived pseudo-weight — sets the resolution): 1, 2, 3, 7, and 21 visits
    // each land in their own distinct, monotonically darker bucket instead of
    // collapsing together.
    const hasLived = bins.map((bin) => bin.some((d) => d.place.lived))
    const visitWeights = bins.map((bin) => bin.reduce((sum, d) => sum + (d.place.lived ? 0 : (d.place.visits ?? 1)), 0))
    const plainWeights = visitWeights.filter((_, i) => !hasLived[i])
    const logWeights = visitWeights.map((w) => Math.log1p(w))
    const maxPlainLog = Math.log1p(Math.max(...plainWeights))
    const visitScale = scaleQuantize<string>().domain([0, maxPlainLog]).range(HEX_COLORS.slice(0, -1))

    return bins.map((bin, i) => ({
      x: bin.x,
      y: bin.y,
      hexagon: d3Hexbin().radius(HEX_RADIUS).hexagon(),
      color: hasLived[i] ? LIVED_COLOR : visitScale(logWeights[i]),
      representative: bin[0].place,
    }))
  }, [])

  return (
    <div className="min-h-[300px] space-y-3 p-4 text-[#252525] sm:min-h-[480px]">
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

      <div className="bg-[#e8e4dc]" style={{ aspectRatio: "800 / 305", overflow: "hidden" }}>
        <ComposableMap
          projection="geoEqualEarth"
          projectionConfig={{ scale: 140 }}
          width={MAP_WIDTH}
          height={MAP_HEIGHT}
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

          {view === "places"
            ? travelPlaces.map((place) => (
                <Marker
                  key={place.name}
                  coordinates={[place.lon, place.lat]}
                  onMouseEnter={() => setSelected(place)}
                  onClick={() => setSelected(place)}
                >
                  {/* Oversized invisible hit area so small dots stay easy to hover/tap */}
                  <circle r={9} fill="transparent" style={{ cursor: "pointer" }} />
                  <circle
                    r={place.lived ? 5 : 4}
                    fill={PLACE_COLOR}
                    stroke="#2a2a2a"
                    strokeWidth={0.6}
                    style={{ cursor: "pointer", pointerEvents: "none" }}
                  />
                </Marker>
              ))
            : hexBins.map((bin, i) => (
                <g
                  key={i}
                  transform={`translate(${bin.x}, ${bin.y})`}
                  onMouseEnter={() => setSelected(bin.representative)}
                  onClick={() => setSelected(bin.representative)}
                >
                  <path
                    d={bin.hexagon}
                    fill={bin.color}
                    stroke="#403b32"
                    strokeWidth={0.4}
                    style={{ cursor: "pointer" }}
                  />
                </g>
              ))}
        </ComposableMap>
      </div>

      {view === "density" && (
        <div className="flex items-center justify-center gap-2 text-xs text-[#5b5549]">
          <span>less</span>
          <div className="flex">
            {HEX_COLORS.map((color) => (
              <div key={color} className="h-3 w-4 border border-[#403b32]/40" style={{ backgroundColor: color }} />
            ))}
          </div>
          <span>more time</span>
        </div>
      )}

      <div className="min-h-[24px] text-center text-sm font-bold text-[#403b32]">
        {selected ? `${selected.name}, ${selected.country}` : ""}
      </div>
    </div>
  )
}

export default TravelsContent
