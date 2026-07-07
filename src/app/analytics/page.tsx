import { getLast30DaysStats, getSnapshots, type AnalyticsStats, type DimStat, type Snapshot } from '@/lib/analytics'

export const dynamic = 'force-dynamic'
export const metadata = { title: 'QR skeniranja — Hotel Porec', robots: { index: false } }

const CHART_BLUE = '#2a78d6'

function formatDay(iso: string) {
  return new Date(iso).toLocaleDateString('hr-HR', { day: 'numeric', month: 'short' })
}

function TopList({ title, rows, dimension }: { title: string; rows: DimStat[]; dimension: string }) {
  const max = Math.max(1, ...rows.map((r) => r.pageviews))
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <h2 className="mb-3 text-sm font-semibold text-gray-700">{title}</h2>
      {rows.length === 0 && <p className="text-sm text-gray-400">Nema podataka</p>}
      <ul className="space-y-2">
        {rows.map((row) => (
          <li key={String(row[dimension])} className="relative">
            <div
              className="absolute inset-y-0 left-0 rounded bg-blue-50"
              style={{ width: `${(row.pageviews / max) * 100}%` }}
            />
            <div className="relative flex justify-between gap-2 px-2 py-1 text-sm">
              <span className="truncate text-gray-800">{String(row[dimension] ?? '—') || '—'}</span>
              <span className="shrink-0 tabular-nums text-gray-500">{row.pageviews}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}

function Dashboard({ stats }: { stats: AnalyticsStats }) {
  const maxDay = Math.max(1, ...stats.daily.map((d) => d.pageviews))
  return (
    <>
      <div className="grid grid-cols-2 gap-4">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">QR skeniranja</p>
          <p className="mt-1 text-3xl font-semibold tabular-nums text-gray-900">
            {stats.totals.pageviews.toLocaleString('hr-HR')}
          </p>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <p className="text-sm text-gray-500">Posjetitelji</p>
          <p className="mt-1 text-3xl font-semibold tabular-nums text-gray-900">
            {stats.totals.visitors.toLocaleString('hr-HR')}
          </p>
        </div>
      </div>

      <div className="rounded-xl border border-gray-200 bg-white p-5">
        <h2 className="mb-4 text-sm font-semibold text-gray-700">Skeniranja po danima</h2>
        <div className="flex h-40 items-end gap-[2px]">
          {stats.daily.map((day) => (
            <div
              key={day.timestamp}
              title={`${formatDay(day.timestamp)} — ${day.pageviews} pregleda, ${day.visitors} posjetitelja`}
              className="min-w-0 flex-1 rounded-t"
              style={{
                backgroundColor: CHART_BLUE,
                height: `${Math.max(2, (day.pageviews / maxDay) * 100)}%`,
              }}
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between text-xs text-gray-400">
          <span>{stats.daily[0] ? formatDay(stats.daily[0].timestamp) : ''}</span>
          <span>{stats.daily.at(-1) ? formatDay(stats.daily.at(-1)!.timestamp) : ''}</span>
        </div>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <TopList title="Najposjećenije stranice" rows={stats.pages} dimension="requestPath" />
        <TopList title="Države" rows={stats.countries} dimension="country" />
        <TopList title="Uređaji" rows={stats.devices} dimension="deviceType" />
        <TopList title="Izvori posjeta" rows={stats.referrers} dimension="referrerHostname" />
      </div>
    </>
  )
}

function History({ snapshots }: { snapshots: Snapshot[] }) {
  if (snapshots.length === 0) return null
  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <h2 className="mb-3 text-sm font-semibold text-gray-700">Povijest po mjesecima</h2>
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-xs text-gray-400">
            <th className="pb-2 font-normal">Razdoblje</th>
            <th className="pb-2 text-right font-normal">QR skeniranja</th>
            <th className="pb-2 text-right font-normal">Posjetitelji</th>
          </tr>
        </thead>
        <tbody>
          {snapshots.map((s) => (
            <tr key={s.until} className="border-t border-gray-100">
              <td className="py-2 text-gray-800">
                {formatDay(s.since)} – {formatDay(s.until)}
              </td>
              <td className="py-2 text-right tabular-nums text-gray-800">
                {s.stats.totals.pageviews.toLocaleString('hr-HR')}
              </td>
              <td className="py-2 text-right tabular-nums text-gray-500">
                {s.stats.totals.visitors.toLocaleString('hr-HR')}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default async function AnalyticsPage() {
  let stats: AnalyticsStats | null = null
  let error: string | null = null
  try {
    stats = await getLast30DaysStats()
  } catch (e) {
    error = e instanceof Error ? e.message : 'Unknown error'
  }
  const snapshots = await getSnapshots().catch(() => [])

  return (
    <main className="mx-auto max-w-3xl space-y-4 p-4 sm:p-8">
      <header>
        <h1 className="text-xl font-semibold text-gray-900">QR skeniranja — Hotel Porec</h1>
        <p className="text-sm text-gray-500">
          Zadnjih 30 dana{stats ? ` (${formatDay(stats.since)} – ${formatDay(stats.until)})` : ''}
        </p>
      </header>
      {error ? (
        <div className="rounded-xl border border-red-200 bg-red-50 p-5 text-sm text-red-700">
          Analitika trenutno nedostupna: {error}
        </div>
      ) : (
        <Dashboard stats={stats!} />
      )}
      <History snapshots={snapshots} />
    </main>
  )
}
