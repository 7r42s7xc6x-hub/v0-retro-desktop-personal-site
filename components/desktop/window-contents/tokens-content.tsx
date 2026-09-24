"use client"

import { useEffect, useState } from "react"
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis } from "recharts"

interface Day {
  d: string
  input: number
  output: number
  cacheRead: number
  cacheWrite: number
  messages: number
  models: Record<string, number>
}

interface TokenData {
  updatedAt: string
  totals: {
    input: number
    output: number
    cacheRead: number
    cacheWrite: number
    messages: number
    sessions: number
    activeDays: number
  }
  firstDay: string | null
  days: Day[]
  heat: number[][]
}

const MODEL_COLORS = ["#b86b3e", "#3f6b8f", "#6b8f3f", "#8f3f6b", "#8f7a3f"]
const BREAKDOWN = [
  { key: "cacheRead", label: "Cache read", color: "#3f6b8f" },
  { key: "cacheWrite", label: "Cache write", color: "#b86b3e" },
  { key: "input", label: "Input", color: "#6b8f3f" },
  { key: "output", label: "Output", color: "#8f3f6b" },
] as const
const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"]

const formatTokens = (n: number) => {
  if (n >= 1e9) return `${(n / 1e9).toFixed(2)}B`
  if (n >= 1e6) return `${(n / 1e6).toFixed(1)}M`
  if (n >= 1e3) return `${(n / 1e3).toFixed(1)}K`
  return String(n)
}

// "claude-sonnet-5" -> "Sonnet 5", "claude-haiku-4-5-20251001" -> "Haiku 4.5"
const modelLabel = (id: string) => {
  const parts = id.replace(/^claude-/, "").replace(/-\d{8}$/, "").split("-")
  const [name, ...version] = parts
  return `${name.charAt(0).toUpperCase()}${name.slice(1)} ${version.join(".")}`.trim()
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="border-2 border-[#403b32] bg-[#fffaf0] p-3 shadow-[2px_2px_0_#403b32]">
      <h2 className="mb-2 text-xs font-bold uppercase tracking-wide">{title}</h2>
      {children}
    </section>
  )
}

export function TokensContent() {
  const [data, setData] = useState<TokenData | null>(null)
  const [failed, setFailed] = useState(false)

  useEffect(() => {
    fetch("/tokens.json")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setData)
      .catch(() => setFailed(true))
  }, [])

  if (failed) return <p className="bg-[#f4efe2] p-4 text-sm text-[#252525]">Couldn&apos;t load token stats.</p>
  if (!data) return <p className="bg-[#f4efe2] p-4 text-sm text-[#252525]">Loading…</p>

  const { totals } = data
  const totalTokens = totals.input + totals.output + totals.cacheRead + totals.cacheWrite
  const models = [...new Set(data.days.flatMap((d) => Object.keys(d.models)))]
  const chartData = data.days.map((d) => ({ day: d.d.slice(5), ...d.models }))
  const heatMax = Math.max(1, ...data.heat.flat())

  const stats = [
    { label: "Tokens", value: formatTokens(totalTokens) },
    { label: "Messages", value: totals.messages.toLocaleString() },
    { label: "Sessions", value: totals.sessions.toLocaleString() },
    { label: "Active days", value: totals.activeDays.toLocaleString() },
  ]

  return (
    <div className="space-y-3 bg-[#f4efe2] p-4 text-[#252525]">
      <p className="text-xs leading-relaxed text-[#5b5549]">
        My Claude Code usage{data.firstDay ? ` since ${data.firstDay}` : ""}.
      </p>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-4">
        {stats.map((s) => (
          <div key={s.label} className="border-2 border-[#403b32] bg-[#fffaf0] p-2 shadow-[2px_2px_0_#403b32]">
            <p className="text-lg font-bold leading-tight">{s.value}</p>
            <p className="text-[10px] uppercase tracking-wide text-[#5b5549]">{s.label}</p>
          </div>
        ))}
      </div>

      <Panel title="Where the tokens go">
        <div className="flex h-4 w-full overflow-hidden border-2 border-[#403b32]">
          {BREAKDOWN.map((b) => (
            <div key={b.key} style={{ width: `${(totals[b.key] / totalTokens) * 100}%`, background: b.color }} />
          ))}
        </div>
        <ul className="mt-2 grid grid-cols-2 gap-x-3 gap-y-1 text-xs">
          {BREAKDOWN.map((b) => (
            <li key={b.key} className="flex items-center gap-1.5">
              <span className="inline-block h-2.5 w-2.5 border border-[#403b32]" style={{ background: b.color }} />
              {b.label} {((totals[b.key] / totalTokens) * 100).toFixed(2)}%
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="Tokens per day, by model">
        <div className="h-32">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 4, right: 0, bottom: 0, left: 0 }}>
              <XAxis dataKey="day" tick={{ fontSize: 10 }} tickLine={false} axisLine={{ stroke: "#403b32" }} />
              <Tooltip
                formatter={(v: number, name: string) => [formatTokens(v), modelLabel(name)]}
                contentStyle={{ fontSize: 11, border: "2px solid #403b32", borderRadius: 0, background: "#fffaf0" }}
              />
              {models.map((m, i) => (
                <Bar key={m} dataKey={m} stackId="t" fill={MODEL_COLORS[i % MODEL_COLORS.length]} />
              ))}
            </BarChart>
          </ResponsiveContainer>
        </div>
        <ul className="mt-2 flex flex-wrap gap-x-3 gap-y-1 text-xs">
          {models.map((m, i) => (
            <li key={m} className="flex items-center gap-1.5">
              <span
                className="inline-block h-2.5 w-2.5 border border-[#403b32]"
                style={{ background: MODEL_COLORS[i % MODEL_COLORS.length] }}
              />
              {modelLabel(m)}
            </li>
          ))}
        </ul>
      </Panel>

      <Panel title="When I work">
        <div className="space-y-px">
          {data.heat.map((row, dow) => (
            <div key={dow} className="flex items-center gap-px">
              <span className="w-3 text-[9px] text-[#5b5549]">{WEEKDAYS[dow]}</span>
              {row.map((n, h) => (
                <div
                  key={h}
                  title={`${n} messages`}
                  className="h-3 flex-1 border border-[#403b32]/10"
                  style={{ background: n ? `rgba(184,107,62,${0.15 + 0.85 * (n / heatMax)})` : "transparent" }}
                />
              ))}
            </div>
          ))}
          <div className="flex justify-between pl-3 text-[9px] text-[#5b5549]">
            <span>12am</span>
            <span>6am</span>
            <span>12pm</span>
            <span>6pm</span>
            <span>11pm</span>
          </div>
        </div>
      </Panel>

      <p className="text-[10px] text-[#5b5549]">
        Updated {new Date(data.updatedAt).toLocaleDateString(undefined, { dateStyle: "medium" })}
      </p>
    </div>
  )
}

export default TokensContent
