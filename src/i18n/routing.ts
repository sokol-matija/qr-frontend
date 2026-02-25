import { defineRouting } from 'next-intl/routing'

export const routing = defineRouting({
  locales: ['en', 'de', 'it', 'hr'],
  defaultLocale: 'en',
  localePrefix: 'always',
})
