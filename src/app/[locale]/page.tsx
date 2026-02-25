import { useTranslations } from 'next-intl'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import {
  Clock,
  LogIn,
  LogOut,
  Phone,
  Mail,
  MapPin,
  Wifi,
  Car,
  Luggage,
  Utensils,
  Info,
  Star,
  AlertCircle,
} from 'lucide-react'

export function generateStaticParams() {
  return ['en', 'de', 'it', 'hr'].map((locale) => ({ locale }))
}

export default function HotelInfoPage() {
  const t = useTranslations()

  const attractions = [
    { icon: '⛪', labelKey: 'explore.basilicaLabel', descKey: 'explore.basilicaDesc' },
    { icon: '🏛️', labelKey: 'explore.oldtownLabel', descKey: 'explore.oldtownDesc' },
    { icon: '🏖️', labelKey: 'explore.beachesLabel', descKey: 'explore.beachesDesc' },
    { icon: '🍽️', labelKey: 'explore.restaurantsLabel', descKey: 'explore.restaurantsDesc' },
    { icon: '🚗', labelKey: 'explore.daytripsLabel', descKey: 'explore.daytripsDesc' },
  ] as const

  const facilities = [
    { icon: <Wifi className="w-4 h-4 text-blue-500 shrink-0" />, labelKey: 'dining.wifiLabel', valueKey: 'dining.wifiValue' },
    { icon: <Clock className="w-4 h-4 text-indigo-500 shrink-0" />, labelKey: 'dining.receptionLabel', valueKey: 'dining.receptionValue' },
    { icon: <Car className="w-4 h-4 text-gray-500 shrink-0" />, labelKey: 'dining.parkingLabel', valueKey: 'dining.parkingValue' },
    { icon: <Luggage className="w-4 h-4 text-teal-500 shrink-0" />, labelKey: 'dining.luggageLabel', valueKey: 'dining.luggageValue' },
    { icon: <MapPin className="w-4 h-4 text-red-400 shrink-0" />, labelKey: 'dining.conciergeLabel', valueKey: 'dining.conciergeValue' },
  ] as const

  return (
    <div className="min-h-screen flex items-start justify-center p-4 py-8 relative overflow-hidden">
      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <img
          src="/mozaik_gp1.png"
          alt="Hotel Poreč Background"
          className="absolute inset-0 w-full h-full object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/60 to-indigo-100/60" />
      </div>

      <div className="w-full max-w-xl relative z-10">
        {/* Card */}
        <div className="shadow-2xl border-0 bg-white/80 backdrop-blur-sm rounded-xl overflow-hidden">

          {/* Header */}
          <div className="py-6 px-6 text-center border-b border-gray-100 relative">
            <div className="mx-auto w-48 h-32 flex items-center justify-center">
              <img
                src="/LOGO1-hires.png"
                alt="Hotel Poreč Logo"
                className="w-full h-full object-contain"
              />
            </div>
            <p className="mt-2 text-sm text-gray-500 font-medium tracking-wide uppercase">
              {t('header.subtitle')}
            </p>
            {/* Language switcher */}
            <div className="absolute top-4 right-4">
              <LanguageSwitcher />
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">

            {/* ── Check-in ── */}
            <section>
              <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-3">
                <Clock className="w-5 h-5 text-blue-600" />
                {t('checkin.title')}
              </h2>

              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-start gap-3 py-2 border-b border-gray-100">
                  <LogIn className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">{t('checkin.checkinTimeLabel')}:</span>{' '}
                    {t('checkin.checkinTimeValue')}
                  </div>
                </div>
                <div className="flex items-start gap-3 py-2 border-b border-gray-100">
                  <LogOut className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">{t('checkin.checkoutTimeLabel')}:</span>{' '}
                    {t('checkin.checkoutTimeValue')}
                  </div>
                </div>
                <div className="flex items-start gap-3 py-2 border-b border-gray-100">
                  <Phone className="w-4 h-4 text-blue-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">{t('checkin.earlyLateLabel')}:</span>{' '}
                    {t('checkin.earlyLateValue')}
                  </div>
                </div>
                <div className="flex items-start gap-3 py-2 border-b border-gray-100">
                  <Info className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">{t('checkin.documentsLabel')}:</span>{' '}
                    {t('checkin.documentsValue')}
                  </div>
                </div>
                <div className="flex items-start gap-3 py-2">
                  <Star className="w-4 h-4 text-yellow-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">{t('checkin.keyCardsLabel')}:</span>{' '}
                    {t('checkin.keyCardsValue')}
                  </div>
                </div>
              </div>

              <div className="mt-3 flex items-start gap-3 p-3 bg-amber-50 border border-amber-200 rounded-lg text-sm text-amber-800">
                <AlertCircle className="w-4 h-4 mt-0.5 shrink-0 text-amber-500" />
                <p>
                  <span className="font-semibold">{t('checkin.earlyNoticeTitle')}:</span>{' '}
                  {t('checkin.earlyNoticeText')}
                </p>
              </div>
            </section>

            <hr className="border-gray-200" />

            {/* ── Dining ── */}
            <section>
              <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-3">
                <Utensils className="w-5 h-5 text-orange-500" />
                {t('dining.title')}
              </h2>

              <div className="mb-4">
                <h3 className="font-medium text-sm uppercase tracking-wide text-orange-600 mb-2">
                  {t('dining.breakfastTitle')}
                </h3>
                <div className="space-y-1.5 text-sm text-gray-700">
                  {(
                    [
                      ['breakfastLabel', 'breakfastValue'],
                      ['locationLabel', 'locationValue'],
                      ['styleLabel', 'styleValue'],
                      ['dietsLabel', 'dietsValue'],
                    ] as const
                  ).map(([lk, vk]) => (
                    <div key={lk} className="flex justify-between gap-4">
                      <span className="text-gray-500 shrink-0">{t(`dining.${lk}`)}:</span>
                      <span className="font-medium text-right">{t(`dining.${vk}`)}</span>
                    </div>
                  ))}
                </div>
              </div>

              <h3 className="font-medium text-sm uppercase tracking-wide text-blue-600 mb-2">
                {t('dining.facilitiesTitle')}
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                {facilities.map(({ icon, labelKey, valueKey }) => (
                  <div key={labelKey} className="flex items-center gap-3">
                    {icon}
                    <span>
                      <span className="font-medium">{t(labelKey)}:</span>{' '}
                      {t(valueKey)}
                    </span>
                  </div>
                ))}
              </div>
            </section>

            <hr className="border-gray-200" />

            {/* ── Explore ── */}
            <section>
              <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-3">
                <span className="text-xl">🏖️</span>
                {t('explore.title')}
              </h2>
              <p className="text-sm text-gray-600 mb-3">{t('explore.description')}</p>
              <ul className="space-y-2">
                {attractions.map(({ icon, labelKey, descKey }) => (
                  <li key={labelKey} className="flex items-start gap-3 text-sm text-gray-700">
                    <span className="text-base shrink-0">{icon}</span>
                    <span>
                      <span className="font-medium text-gray-900">{t(labelKey)}:</span>{' '}
                      {t(descKey)}
                    </span>
                  </li>
                ))}
              </ul>
            </section>

            <hr className="border-gray-200" />

            {/* ── Contact ── */}
            <section>
              <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-3">
                <Phone className="w-5 h-5 text-green-600" />
                {t('contact.title')}
              </h2>
              <div className="grid grid-cols-2 gap-3">
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide">
                    {t('contact.phoneLabel')}
                  </p>
                  <a
                    href="tel:+38552451611"
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                  >
                    +385 (0)52 451 611
                  </a>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide">
                    {t('contact.emailLabel')}
                  </p>
                  <a
                    href="mailto:hotelporec@pu.t-com.hr"
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors break-all"
                  >
                    hotelporec@pu.t-com.hr
                  </a>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide">
                    {t('contact.addressLabel')}
                  </p>
                  <p className="text-sm font-medium text-gray-800">{t('contact.addressValue')}</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <p className="text-xs text-green-600 mb-1 font-medium uppercase tracking-wide">
                    {t('contact.emergencyLabel')}
                  </p>
                  <p className="text-sm font-medium text-gray-800">{t('contact.emergencyValue')}</p>
                </div>
              </div>
            </section>

          </div>
        </div>

        <div className="mt-6 text-center">
          <p className="text-sm text-gray-600">
            Made by Matija Sokol for Mara with <span className="text-red-500">♥</span>
          </p>
        </div>
      </div>
    </div>
  )
}
