import { redirect } from 'next/navigation'

// Root "/" is handled by middleware which redirects to /en (or browser locale).
// This page is a safety fallback.
export default function RootPage() {
  redirect('/en')
}
