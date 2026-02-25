'use client'

import { useLocale } from 'next-intl'
import { useRouter, usePathname, type Locale } from '@/i18n/navigation'

const LANGUAGES: { code: Locale; label: string; flag: string }[] = [
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'de', label: 'DE', flag: '🇩🇪' },
  { code: 'it', label: 'IT', flag: '🇮🇹' },
  { code: 'hr', label: 'HR', flag: '🇭🇷' },
]

export function LanguageSwitcher() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()

  const switchLocale = (newLocale: Locale) => {
    router.replace(pathname, { locale: newLocale })
  }

  return (
    <div className="flex items-center gap-1">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => switchLocale(lang.code)}
          className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold transition-colors cursor-pointer ${
            locale === lang.code
              ? 'bg-blue-600 text-white shadow-sm'
              : 'bg-white/60 text-gray-600 hover:bg-white hover:text-gray-900 border border-gray-200'
          }`}
        >
          <span>{lang.flag}</span>
          <span>{lang.label}</span>
        </button>
      ))}
    </div>
  )
}
