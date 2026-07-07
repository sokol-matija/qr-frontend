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
    next: { revalidate: 3600 },
  })
  if (!res.ok) throw new Error(`Vercel Analytics API ${res.status}: ${await res.text()}`)
  return (await res.json()).data
}

// Vercel Hobby only retains 1 month of analytics, so each monthly report also
// snapshots totals into Supabase (qr_analytics_monthly) for permanent history.
const SNAPSHOT_URL =
  'https://gkbpthurkucotikjefra.supabase.co/rest/v1/qr_analytics_monthly'

function supabaseHeaders() {
  const key = process.env.SUPABASE_SERVICE_KEY || ''
  return { apikey: key, Authorization: `Bearer ${key}` }
}

export async function saveSnapshot(stats: AnalyticsStats): Promise<boolean> {
  const res = await fetch(`${SNAPSHOT_URL}?on_conflict=until`, {
    method: 'POST',
    cache: 'no-store',
    headers: {
      ...supabaseHeaders(),
      'Content-Type': 'application/json',
      Prefer: 'resolution=ignore-duplicates',
    },
    body: JSON.stringify({ since: stats.since, until: stats.until, stats }),
  })
  return res.ok
}

export interface Snapshot {
  since: string
  until: string
  stats: AnalyticsStats
}

export async function getSnapshots(): Promise<Snapshot[]> {
  const res = await fetch(`${SNAPSHOT_URL}?select=since,until,stats&order=until.desc`, {
    headers: supabaseHeaders(),
    next: { revalidate: 3600 },
  })
  if (!res.ok) return []
  return res.json()
}

// ponytail: last 30 days, not calendar month — Hobby plan only retains 1 month,
// so a calendar-month query on the 1st would fall partly outside the window
export async function getLast30DaysStats(): Promise<AnalyticsStats> {
  const until = new Date().toISOString().slice(0, 10)
  const since = new Date(Date.now() - 30 * 86400000).toISOString().slice(0, 10)
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
