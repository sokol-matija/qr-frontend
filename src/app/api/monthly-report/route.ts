import { NextResponse } from 'next/server'
import { getLast30DaysStats, saveSnapshot, type AnalyticsStats, type DimStat } from '@/lib/analytics'

export const dynamic = 'force-dynamic'

// ponytail: Resend test mode only delivers to account owner — REPORT_TO stays
// sokol.matija@gmail.com until hotelporec.com is verified, then flip to Mara
const REPORT_TO = process.env.REPORT_TO || 'maradugandzic9@gmail.com'
// ponytail: onboarding@resend.dev only delivers to the Resend account owner —
// verify hotelporec.com in Resend and set REPORT_FROM to send to Mara
const REPORT_FROM = process.env.REPORT_FROM || 'Hotel Porec <onboarding@resend.dev>'

function topTable(title: string, rows: DimStat[], dimension: string) {
  const body = rows
    .slice(0, 5)
    .map(
      (row) =>
        `<tr><td style="padding:4px 12px 4px 0;color:#333">${String(row[dimension] ?? '—') || '—'}</td>` +
        `<td style="padding:4px 0;color:#666;text-align:right">${row.pageviews}</td></tr>`
    )
    .join('')
  return `<h3 style="margin:20px 0 6px;font-size:14px;color:#111">${title}</h3>
    <table style="border-collapse:collapse;font-size:14px;width:100%">${body || '<tr><td style="color:#999">Nema podataka</td></tr>'}</table>`
}

function renderEmail(stats: AnalyticsStats, dashboardUrl: string) {
  return `<div style="font-family:sans-serif;max-width:520px;margin:0 auto;padding:16px">
    <h2 style="color:#111">Hotel Porec — mjesečna QR skeniranja</h2>
    <p style="color:#666;font-size:14px">Razdoblje: ${stats.since} – ${stats.until}</p>
    <table style="width:100%;border-collapse:collapse;margin:16px 0">
      <tr>
        <td style="padding:12px;background:#f0f6ff;border-radius:8px">
          <div style="font-size:13px;color:#666">QR skeniranja</div>
          <div style="font-size:28px;font-weight:600;color:#111">${stats.totals.pageviews.toLocaleString('hr-HR')}</div>
        </td>
        <td style="width:12px"></td>
        <td style="padding:12px;background:#f0f6ff;border-radius:8px">
          <div style="font-size:13px;color:#666">Posjetitelji</div>
          <div style="font-size:28px;font-weight:600;color:#111">${stats.totals.visitors.toLocaleString('hr-HR')}</div>
        </td>
      </tr>
    </table>
    ${topTable('Najposjećenije stranice', stats.pages, 'requestPath')}
    ${topTable('Države', stats.countries, 'country')}
    ${topTable('Uređaji', stats.devices, 'deviceType')}
    <p style="margin-top:24px"><a href="${dashboardUrl}" style="color:#2a78d6">Pogledaj cijelu analitiku →</a></p>
  </div>`
}

export async function GET(req: Request) {
  const secret = process.env.CRON_SECRET
  if (secret && req.headers.get('authorization') !== `Bearer ${secret}`) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const stats = await getLast30DaysStats()
  const saved = await saveSnapshot(stats).catch(() => false)
  const dashboardUrl = `https://${req.headers.get('host')}/analytics`

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    cache: 'no-store',
    headers: {
      Authorization: `Bearer ${process.env.RESEND_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: REPORT_FROM,
      to: [REPORT_TO],
      subject: `Hotel Porec — QR skeniranja, ${new Date(stats.since).toLocaleDateString('hr-HR', { month: 'long', year: 'numeric' })} · from Matija with love <3`,
      html: renderEmail(stats, dashboardUrl),
    }),
  })

  const result = await res.json()
  if (!res.ok) {
    return NextResponse.json({ error: result.message || 'Resend failed' }, { status: 502 })
  }
  return NextResponse.json({ sent: true, to: REPORT_TO, emailId: result.id, saved })
}
