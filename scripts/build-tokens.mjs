// Aggregates Claude Code session logs into public/tokens.json.
// Numbers only: no prompts, file paths, or project names leave this machine.
//
// Claude Code deletes old session logs, so this MERGES into the existing
// tokens.json instead of overwriting it: a day that has been recorded is never
// dropped, and totals are always summed from the stored days.
import { execFileSync } from "node:child_process"
import { createHash } from "node:crypto"
import { existsSync, readdirSync, readFileSync, writeFileSync, statSync } from "node:fs"
import { homedir } from "node:os"
import { join, dirname } from "node:path"
import { fileURLToPath } from "node:url"

const root = process.env.CLAUDE_PROJECTS_DIR ?? join(homedir(), ".claude", "projects")
const out = process.argv[2] ?? join(dirname(fileURLToPath(import.meta.url)), "..", "public", "tokens.json")

function* walk(dir) {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name)
    if (statSync(p).isDirectory()) yield* walk(p)
    else if (name.endsWith(".jsonl")) yield p
  }
}

const dayTokens = (d) => d.input + d.output + d.cacheRead + d.cacheWrite
// Session ids are stored hashed so raw ids never get published.
const hashId = (id) => createHash("sha256").update(String(id)).digest("hex").slice(0, 12)

// --- Read what's already recorded (if anything) ---------------------------
let stored = { days: [], sessionHashes: [] }
if (existsSync(out)) {
  // If this fails, throw: better to fail the run than overwrite recorded history.
  stored = JSON.parse(readFileSync(out, "utf8"))
}
const storedDays = new Map(stored.days.map((d) => [d.d, d]))
const sessionHashes = new Set(stored.sessionHashes ?? [])

// --- GitHub contributions per day (counts only) ----------------------------
// Uses the gh CLI. If it fails (offline, logged out) we just keep what's stored.
const commits = { ...(stored.commits ?? {}) }
try {
  const from = new Date(Date.now() - 364 * 86400000).toISOString()
  const query = `query($from: DateTime!) { viewer { contributionsCollection(from: $from) {
    contributionCalendar { weeks { contributionDays { date contributionCount } } } } } }`
  const res = JSON.parse(
    execFileSync("gh", ["api", "graphql", "-f", `query=${query}`, "-f", `from=${from}`], { encoding: "utf8", timeout: 30000 }),
  )
  for (const w of res.data.viewer.contributionsCollection.contributionCalendar.weeks)
    for (const { date, contributionCount } of w.contributionDays)
      if (contributionCount > 0) commits[date] = Math.max(commits[date] ?? 0, contributionCount)
} catch (err) {
  console.warn(`GitHub contributions not updated: ${err.message.split("\n")[0]}`)
}

// --- Aggregate the logs that still exist ----------------------------------
// Claude Code logs one line per content block, so the same message repeats.
// Keep one record per message id (the one with the most output tokens).
const messages = new Map()
if (existsSync(root)) {
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
}

const pad = (n) => String(n).padStart(2, "0")
const fresh = new Map()
for (const { ts, model, usage, session } of messages.values()) {
  const t = new Date(ts)
  const day = `${t.getFullYear()}-${pad(t.getMonth() + 1)}-${pad(t.getDate())}`
  const input = usage.input_tokens ?? 0
  const output = usage.output_tokens ?? 0
  const cacheRead = usage.cache_read_input_tokens ?? 0
  const cacheWrite = usage.cache_creation_input_tokens ?? 0

  const row =
    fresh.get(day) ??
    { d: day, input: 0, output: 0, cacheRead: 0, cacheWrite: 0, messages: 0, models: {}, hours: Array(24).fill(0) }
  row.input += input
  row.output += output
  row.cacheRead += cacheRead
  row.cacheWrite += cacheWrite
  row.messages += 1
  row.hours[t.getHours()] += 1
  row.models[model] = (row.models[model] ?? 0) + input + output + cacheRead + cacheWrite
  fresh.set(day, row)

  if (session) sessionHashes.add(hashId(session))
}

// --- Merge: per day, keep whichever copy is bigger -------------------------
// Logs only grow within a day and only shrink when deleted, so bigger = more complete.
const merged = new Map(storedDays)
for (const [day, row] of fresh) {
  const old = merged.get(day)
  if (!old || dayTokens(row) >= dayTokens(old)) merged.set(day, row)
}

const days = [...merged.values()].sort((a, b) => a.d.localeCompare(b.d))

const totals = { input: 0, output: 0, cacheRead: 0, cacheWrite: 0, messages: 0 }
const heat = Array.from({ length: 7 }, () => Array(24).fill(0))
for (const day of days) {
  for (const k of ["input", "output", "cacheRead", "cacheWrite", "messages"]) totals[k] += day[k]
  if (!day.hours) continue
  const [y, mo, d] = day.d.split("-").map(Number)
  const dow = new Date(y, mo - 1, d).getDay()
  day.hours.forEach((n, h) => (heat[dow][h] += n))
}

const data = {
  updatedAt: new Date().toISOString(),
  totals: { ...totals, sessions: Math.max(sessionHashes.size, stored.totals?.sessions ?? 0), activeDays: days.length },
  firstDay: days[0]?.d ?? null,
  days,
  heat,
  commits,
  sessionHashes: [...sessionHashes].sort(),
}

writeFileSync(out, JSON.stringify(data) + "\n")
console.log(
  `Wrote ${out}: ${totals.messages} messages (${messages.size} in current logs), ${sessionHashes.size} sessions, ${days.length} days`,
)
