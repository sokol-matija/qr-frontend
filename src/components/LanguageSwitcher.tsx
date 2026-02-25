'use client'

import { useLocale } from 'next-intl'

const LANGUAGES = [
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'de', label: 'DE', flag: '🇩🇪' },
  { code: 'it', label: 'IT', flag: '🇮🇹' },
  { code: 'hr', label: 'HR', flag: '🇭🇷' },
]

export function LanguageSwitcher() {
  const locale = useLocale()

  return (
    <div className="flex items-center gap-1">
      {LANGUAGES.map((lang) => (
        <a
          key={lang.code}
          href={`/${lang.code}`}
          className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold transition-colors no-underline ${
            locale === lang.code
              ? 'bg-blue-600 text-white shadow-sm pointer-events-none'
              : 'bg-white/60 text-gray-600 hover:bg-white hover:text-gray-900 border border-gray-200'
          }`}
        >
          <span>{lang.flag}</span>
          <span>{lang.label}</span>
        </a>
      ))}
    </div>
  )
}
