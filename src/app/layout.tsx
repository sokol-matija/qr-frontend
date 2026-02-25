import type { ReactNode } from 'react'

// Root layout — html/body are provided by [locale]/layout.tsx
// This file exists only because Next.js requires a root layout.
export default function RootLayout({ children }: { children: ReactNode }): ReactNode {
  return children
}
