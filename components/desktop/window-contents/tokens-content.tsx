"use client"

import { useEffect, useRef, useState } from "react"
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
  commits?: Record<string, number>
}

const MODEL_COLORS = ["#b86b3e", "#3f6b8f", "#6b8f3f", "#8f3f6b", "#8f7a3f"]
const BREAKDOWN = [
  { key: "cacheRead", label: "Cache read", color: "#3f6b8f" },
  { key: "cacheWrite", label: "Cache write", color: "#b86b3e" },
  { key: "input", label: "Input", color: "#6b8f3f" },
  { key: "output", label: "Output", color: "#8f3f6b" },
] as const
const WEEKDAYS = ["S", "M", "T", "W", "T", "F", "S"]

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
const MIN_WEEKS = 16

// Days as whole numbers (UTC) so date maths ignores time zones and DST.
const toNum = (iso: string) => {
  const [y, m, d] = iso.split("-").map(Number)
  return Math.round(Date.UTC(y, m - 1, d) / 86400000)
}
const fromNum = (n: number) => new Date(n * 86400000)
const todayNum = () => {
  const t = new Date()
  return Math.round(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate()) / 86400000)
}
const isoOf = (n: number) => fromNum(n).toISOString().slice(0, 10)

function streaks(active: number[], today: number) {
  const nums = [...new Set(active)].sort((a, b) => a - b)
  let longest = 0
  let run = 0
  nums.forEach((n, i) => {
    run = i > 0 && n === nums[i - 1] + 1 ? run + 1 : 1
    longest = Math.max(longest, run)
  })
  // The current streak stays alive if today hasn't had activity yet but yesterday did.
  const set = new Set(nums)
  let cursor = set.has(today) ? today : today - 1
  let current = 0
  while (set.has(cursor)) {
    current += 1
    cursor -= 1
  }
  return { current, longest }
}

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
  const calendarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    fetch("/tokens.json")
      .then((r) => (r.ok ? r.json() : Promise.reject()))
      .then(setData)
      .catch(() => setFailed(true))
  }, [])

  // Keep the newest weeks in view when the calendar is wider than the window.
  useEffect(() => {
    if (data && calendarRef.current) calendarRef.current.scrollLeft = calendarRef.current.scrollWidth
  }, [data])

  if (failed) return <p className="bg-[#f4efe2] p-4 text-sm text-[#252525]">Couldn&apos;t load token stats.</p>
  if (!data) return <p className="bg-[#f4efe2] p-4 text-sm text-[#252525]">Loading…</p>

  const { totals } = data
  const totalTokens = totals.input + totals.output + totals.cacheRead + totals.cacheWrite
  const models = [...new Set(data.days.flatMap((d) => Object.keys(d.models)))]
  const chartData = data.days.map((d) => ({ day: d.d.slice(5), ...d.models }))
  const heatMax = Math.max(1, ...data.heat.flat())

  const today = todayNum()
  const firstNum = data.firstDay ? toNum(data.firstDay) : today
  const daysElapsed = Math.max(1, today - firstNum + 1)
  const { current, longest } = streaks(data.days.map((d) => toNum(d.d)), today)
  const plural = (n: number) => `${n} day${n === 1 ? "" : "s"}`

  const stats = [
    { label: "Tokens", value: formatTokens(totalTokens) },
    { label: "Messages", value: totals.messages.toLocaleString() },
    { label: "Sessions", value: totals.sessions.toLocaleString() },
    { label: "Active days", value: `${totals.activeDays} of ${daysElapsed}` },
    { label: "Current streak", value: plural(current) },
    { label: "Longest streak", value: plural(longest) },
  ]

  // Calendar: weeks run Sunday to Saturday, ending with the current week.
  const commits = data.commits ?? {}
  const byDay = new Map(data.days.map((d) => [d.d, d]))
  const sunday = (n: number) => n - fromNum(n).getUTCDay()
  const startNum = Math.min(sunday(firstNum), sunday(today) - (MIN_WEEKS - 1) * 7)
  const weekCount = (sunday(today) - startNum) / 7 + 1
  const dayMax = Math.max(1, ...data.days.map((d) => d.input + d.output + d.cacheRead + d.cacheWrite))
  const totalCommits = Object.values(commits).reduce((a, b) => a + b, 0)

  return (
    <div className="space-y-3 bg-[#f4efe2] p-4 text-[#252525]">
      <p className="text-xs leading-relaxed text-[#5b5549]">
        My Claude Code usage{data.firstDay ? ` since ${data.firstDay}` : ""}.
      </p>

      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3">
        {stats.map((s) => (
          <div key={s.label} className="border-2 border-[#403b32] bg-[#fffaf0] p-2 shadow-[2px_2px_0_#403b32]">
            <p className="text-lg font-bold leading-tight">{s.value}</p>
            <p className="text-[10px] uppercase tracking-wide text-[#5b5549]">{s.label}</p>
          </div>
        ))}
      </div>

      <Panel title="Calendar">
        <div ref={calendarRef} className="overflow-x-auto pb-1">
          <div className="flex gap-[2px]">
            <div className="flex flex-col gap-[2px] pt-[14px] pr-1 text-[9px] leading-[12px] text-[#5b5549]">
              {WEEKDAYS.map((w, i) => (
                <span key={i} className="h-3">
                  {i % 2 === 1 ? w : ""}
                </span>
              ))}
            </div>
            {Array.from({ length: weekCount }, (_, w) => {
              const weekStart = startNum + w * 7
              const month = fromNum(weekStart).getUTCMonth()
              const prevMonth = w > 0 ? fromNum(weekStart - 7).getUTCMonth() : -1
              return (
                <div key={w} className="flex flex-col gap-[2px]">
                  <span className="h-3 w-3 overflow-visible whitespace-nowrap text-[9px] leading-3 text-[#5b5549]">
                    {month !== prevMonth ? MONTHS[month] : ""}
                  </span>
                  {Array.from({ length: 7 }, (_, dow) => {
                    const n = weekStart + dow
                    if (n > today) return <div key={dow} className="h-3 w-3" />
                    const iso = isoOf(n)
                    const day = byDay.get(iso)
                    const tokens = day ? day.input + day.output + day.cacheRead + day.cacheWrite : 0
                    const gh = commits[iso] ?? 0
                    const label = [
                      fromNum(n).toLocaleDateString(undefined, { weekday: "short", month: "short", day: "numeric", timeZone: "UTC" }),
                      tokens ? `${formatTokens(tokens)} tokens · ${day!.messages} messages` : "no Claude Code usage",
                      gh ? `${gh} GitHub contribution${gh === 1 ? "" : "s"}` : "",
                    ]
                      .filter(Boolean)
                      .join(" · ")
                    return (
                      <div
                        key={dow}
                        title={label}
                        className="relative h-3 w-3 border border-[#403b32]/20"
                        style={{
                          background: tokens ? `rgba(184,107,62,${0.2 + 0.8 * (tokens / dayMax)})` : "rgba(64,59,50,0.06)",
                        }}
                      >
                        {gh > 0 && (
                          <span
                            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#252525]"
                            style={{ width: gh >= 3 ? 7 : 4, height: gh >= 3 ? 7 : 4 }}
                          />
                        )}
                      </div>
                    )
                  })}
                </div>
              )
            })}
          </div>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-x-3 gap-y-1 text-[10px] text-[#5b5549]">
          <span className="flex items-center gap-1">
            Less
            {[0.2, 0.45, 0.7, 1].map((o) => (
              <span key={o} className="inline-block h-2.5 w-2.5 border border-[#403b32]/20" style={{ background: `rgba(184,107,62,${o})` }} />
            ))}
            More tokens
          </span>
          <span className="flex items-center gap-1">
            <span className="inline-block h-1.5 w-1.5 rounded-full bg-[#252525]" />
            GitHub contributions ({totalCommits} in the last year)
          </span>
        </div>
      </Panel>

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
