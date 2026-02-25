import { createNavigation } from 'next-intl/navigation'

export const locales = ['en', 'de', 'it', 'hr'] as const
export type Locale = (typeof locales)[number]

export const { Link, redirect, useRouter, usePathname } = createNavigation({
  locales,
  localePrefix: 'always',
})
