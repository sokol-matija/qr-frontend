const PROJECT_ID = 'prj_7Mx8UYMpJghcI9Cv2eJO2IG2d5Dw'
const TEAM_ID = 'team_uObgVUo8Ge6Cb3emFbDaqH89'
const API = 'https://api.vercel.com/v1/query/web-analytics'

export interface DayStat {
  timestamp: string
  pageviews: number
  visitors: number
}

export interface DimStat {
  pageviews: number
  visitors: number
  [dimension: string]: string | number
}

export interface AnalyticsStats {
  since: string
  until: string
  totals: { pageviews: number; visitors: number }
  daily: DayStat[]
  pages: DimStat[]
  countries: DimStat[]
  devices: DimStat[]
  referrers: DimStat[]
}

async function query(endpoint: string, params: Record<string, string>) {
  const token = process.env.VERCEL_API_TOKEN
  if (!token) throw new Error('VERCEL_API_TOKEN is not set')
  const url = new URL(`${API}/${endpoint}`)
  url.searchParams.set('projectId', PROJECT_ID)
  url.searchParams.set('teamId', TEAM_ID)
  for (const [key, value] of Object.entries(params)) url.searchParams.set(key, value)
  const res = await fetch(url, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 60 },
  })
  if (!res.ok) throw new Error(`Vercel Analytics API ${res.status}: ${await res.text()}`)
  return (await res.json()).data
}

// Vercel Hobby only retains 1 month of analytics, so the cron snapshots totals
// into Supabase (qr_analytics_monthly) for permanent history.
const SNAPSHOT_URL =
  'https://gkbpthurkucotikjefra.supabase.co/rest/v1/qr_analytics_monthly'

function supabaseHeaders() {
  const key = process.env.SUPABASE_SERVICE_KEY || ''
  return { apikey: key, Authorization: `Bearer ${key}` }
}

// Keyed on the month's last day and upserted, so the daily cron overwrites the
// same row all month. A missed run self-heals the next day instead of losing
// the month — which is what happened on 2026-08-01.
export async function saveSnapshot(stats: AnalyticsStats): Promise<true | string> {
  const res = await fetch(`${SNAPSHOT_URL}?on_conflict=until`, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      ...supabaseHeaders(),
      'Content-Type': 'application/json',
      Prefer: 'resolution=merge-duplicates',
    },
    body: JSON.stringify({
      since: monthBounds().since,
      until: monthBounds().monthEnd,
      stats,
    }),
  })
  // Surface the reason — a silently-swallowed failure here is how the
  // 2026-08-01 snapshot went missing without anyone noticing.
  return res.ok || `${res.status}: ${await res.text()}`
}

export interface Snapshot {
  since: string
  until: string
  stats: AnalyticsStats
}

export async function getSnapshots(): Promise<Snapshot[]> {
  const res = await fetch(`${SNAPSHOT_URL}?select=since,until,stats&order=until.desc`, {
    headers: supabaseHeaders(),
    next: { revalidate: 60 },
  })
  if (!res.ok) return []
  return res.json()
}

const iso = (d: Date) => d.toISOString().slice(0, 10)

// since = 1st of this month, monthEnd = its last day (the stable snapshot key).
// The Vercel query still stops at today — a future `until` returns nothing.
function monthBounds() {
  const now = new Date()
  const y = now.getUTCFullYear()
  const m = now.getUTCMonth()
  return {
    since: iso(new Date(Date.UTC(y, m, 1))),
    monthEnd: iso(new Date(Date.UTC(y, m + 1, 0))),
  }
}

async function statsFor(since: string, until: string): Promise<AnalyticsStats> {
  const range = { since, until }
  const top = (by: string) => query('visits/aggregate', { ...range, by, limit: '10' })
  const [totals, daily, pages, countries, devices, referrers] = await Promise.all([
    query('visits/count', range),
    query('visits/aggregate', { ...range, by: 'day' }),
    top('requestPath'),
    top('country'),
    top('deviceType'),
    top('referrerHostname'),
  ])
  return { since, until, totals, daily, pages, countries, devices, referrers }
}

// ponytail: rolling window, not calendar month — Hobby plan only retains 1 month,
// so a calendar-month query on the 1st would fall partly outside the window
export const getLastNDaysStats = (days: number) =>
  statsFor(iso(new Date(Date.now() - days * 86400000)), iso(new Date()))

export const getLast30DaysStats = () => getLastNDaysStats(30)

// Month-to-date, for the snapshot the daily cron upserts.
export const getMonthToDateStats = () => statsFor(monthBounds().since, iso(new Date()))

// Belt-and-braces: the daily cron is the primary writer, but if it stops firing
// (as it silently did before 2026-08-17) the first page view of the month writes
// the row instead. No-ops once the month already has one.
export async function ensureMonthSnapshot(snapshots: Snapshot[]): Promise<void> {
  if (snapshots.some((s) => s.until === monthBounds().monthEnd)) return
  await saveSnapshot(await getMonthToDateStats()).catch(() => {})
}
