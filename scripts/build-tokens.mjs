// Aggregates Claude Code session logs into public/tokens.json.
// Numbers only: no prompts, file paths, or project names leave this machine.
import { readdirSync, readFileSync, writeFileSync, statSync } from "node:fs"
import { homedir } from "node:os"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const root = join(homedir(), ".claude", "projects")
const out = process.argv[2] ?? join(dirname(fileURLToPath(import.meta.url)), "..", "public", "tokens.json")

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) yield* walk(p)
    else if (name.endsWith(".jsonl")) yield p
  }
}

// Claude Code logs one line per content block, so the same message repeats.
// Keep one record per message id (the one with the most output tokens).
const messages = new Map()
for (const file of walk(root)) {
  for (const line of readFileSync(file, "utf8").split("\n")) {
    if (!line.includes('"usage"')) continue
    let d
    try {
      d = JSON.parse(line)
    } catch {
      continue
    }
    const m = d.message
    if (!m?.usage || !m.model || m.model.startsWith("<") || !d.timestamp) continue
    const key = m.id ?? d.uuid
    const prev = messages.get(key)
    if (prev && prev.usage.output_tokens >= (m.usage.output_tokens ?? 0)) continue
    messages.set(key, { ts: d.timestamp, model: m.model, usage: m.usage, session: d.sessionId })
  }
}

const pad = (n) => String(n).padStart(2, "0")
const daily = new Map()
const heat = Array.from({ length: 7 }, () => Array(24).fill(0))
const totals = { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 }
const sessions = new Set()

for (const { ts, model, usage, session } of messages.values()) {
  const t = new Date(ts)
  const day = `${t.getFullYear()}-${pad(t.getMonth() + 1)}-${pad(t.getDate())}`
  const input = usage.input_tokens ?? 0
  const output = usage.output_tokens ?? 0
  const cacheRead = usage.cache_read_input_tokens ?? 0
  const cacheWrite = usage.cache_creation_input_tokens ?? 0

  const row = daily.get(day) ?? { d: day, input: 0, output: 0, cacheRead: 0, cacheWrite: 0, messages: 0, models: {} }
  row.input += input
  row.output += output
  row.cacheRead += cacheRead
  row.cacheWrite += cacheWrite
  row.messages += 1
  row.models[model] = (row.models[model] ?? 0) + input + output + cacheRead + cacheWrite
  daily.set(day, row)

  heat[t.getDay()][t.getHours()] += 1
  totals.input += input
  totals.output += output
  totals.cacheRead += cacheRead
  totals.cacheWrite += cacheWrite
  if (session) sessions.add(session)
}

const days = [...daily.values()].sort((a, b) => a.d.localeCompare(b.d))
const data = {
  updatedAt: new Date().toISOString(),
  totals: { ...totals, messages: messages.size, sessions: sessions.size, activeDays: days.length },
  firstDay: days[0]?.d ?? null,
  days,
  heat,
}

writeFileSync(out, JSON.stringify(data) + "\n")
console.log(`Wrote ${out}: ${messages.size} messages, ${sessions.size} sessions, ${days.length} days`)
