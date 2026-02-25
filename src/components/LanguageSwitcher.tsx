'use client'

import { useLocale } from 'next-intl'

const LANGUAGES = [
  { code: 'en', label: 'EN', flag: '🇬🇧' },
  { code: 'de', label: 'DE', flag: '🇩🇪' },
  { code: 'it', label: 'IT', flag: '🇮🇹' },
  { code: 'hr', label: 'HR', flag: '🇭🇷' },
]

interface LanguageSwitcherProps {
  size?: 'sm' | 'lg'
}

export function LanguageSwitcher({ size = 'sm' }: LanguageSwitcherProps) {
  const locale = useLocale()

  const btnClass = size === 'lg'
    ? 'inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors no-underline'
    : 'inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-semibold transition-colors no-underline'

  return (
    <div className="flex items-center gap-2">
      {LANGUAGES.map((lang) => (
        <a
          key={lang.code}
          href={`/${lang.code}`}
          className={`${btnClass} ${
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
