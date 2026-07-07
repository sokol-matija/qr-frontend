import type { ReactNode } from 'react'
import '../globals.css'

// /analytics lives outside [locale], so it renders its own html/body
export default function AnalyticsLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="hr">
      <body className="bg-gray-50">{children}</body>
    </html>
  )
}
