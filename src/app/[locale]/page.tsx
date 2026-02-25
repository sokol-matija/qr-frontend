import { useTranslations } from 'next-intl'
import { setRequestLocale } from 'next-intl/server'
import { LanguageSwitcher } from '@/components/LanguageSwitcher'
import {
  LogIn,
  LogOut,
  Phone,
  Wifi,
  Car,
  Luggage,
  Utensils,
  AlertCircle,
  Info,
  Shield,
  List,
  Tv,
  Banknote,
  HeartPulse,
  RefreshCw,
  PawPrint,
  Mail,
  Globe,
} from 'lucide-react'

export function generateStaticParams() {
  return ['en', 'de', 'it', 'hr'].map((locale) => ({ locale }))
}

const TV_CHANNELS = {
  hr: ['HRT 1', 'HRT 2', 'HRT 3', 'Nova TV', 'RTL', 'RTL II', 'Doma TV'],
  de: ['ARD', 'ZDF', 'SAT 1', 'Pro Sieben', 'RTL', 'Kika', 'ORF 2', 'Eurosport 1', '3 SAT', 'Sixx'],
  it: ['RAI 1', 'RAI 2', 'RAI 3', 'Rete 4', 'Canale 5', 'Italia 1'],
  int: ['CNN Int', 'TV 5 Monde', 'BVN'],
}

export default function HotelInfoPage({ params }: { params: { locale: string } }) {
  setRequestLocale(params.locale)
  const t = useTranslations()

  const SEASONS = [
    { key: 'A', label: t('prices.seasonA'), dates: t('prices.seasonADates') },
    { key: 'B', label: t('prices.seasonB'), dates: t('prices.seasonBDates') },
    { key: 'C', label: t('prices.seasonC'), dates: t('prices.seasonCDates') },
    { key: 'D', label: t('prices.seasonD'), dates: t('prices.seasonDDates') },
  ]

  const houseRules = [
    t('importantInfo.rule1'),
    t('importantInfo.rule2'),
    t('importantInfo.rule3'),
    t('importantInfo.rule4'),
    t('importantInfo.rule5'),
    t('importantInfo.rule6'),
    t('importantInfo.rule7'),
    t('importantInfo.rule8'),
    t('importantInfo.rule9'),
    t('importantInfo.rule10'),
    t('importantInfo.rule11'),
    t('importantInfo.rule12'),
    t('importantInfo.rule13'),
    t('importantInfo.rule14'),
  ]

  const roomRows = [
    { label: t('prices.superiorDouble'), prices: [56, 70, 87, 106], superior: true },
    { label: t('prices.superiorSingle'), prices: [83, 108, 139, 169], superior: true },
    { label: t('prices.doubleRoom'), prices: [47, 57, 69, 90] },
    { label: t('prices.singleRoom'), prices: [70, 88, 110, 144] },
    { label: t('prices.tripleRoom'), prices: [47, 57, 69, 90] },
    { label: t('prices.familyRoom'), note: t('prices.familyRoomNote'), prices: [47, 57, 69, 90] },
    { label: t('prices.rooftopApt'), note: t('prices.rooftopAptNote'), prices: [250, 300, 360, 460], perApt: true },
  ]

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
          <div className="py-6 px-6 text-center border-b border-gray-100">
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
            <div className="mt-4 flex justify-center">
              <LanguageSwitcher size="lg" />
            </div>
          </div>

          {/* Content */}
          <div className="p-6 space-y-6">

            {/* ── 1. Important Information ── */}
            <section>
              <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-3">
                <Shield className="w-5 h-5 text-blue-600" />
                {t('importantInfo.title')}
              </h2>

              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-start gap-3 py-2 border-b border-gray-100">
                  <LogIn className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">{t('importantInfo.checkinLabel')}:</span>{' '}
                    {t('importantInfo.checkinValue')}
                  </div>
                </div>
                <div className="flex items-start gap-3 py-2 border-b border-gray-100">
                  <LogOut className="w-4 h-4 text-orange-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">{t('importantInfo.checkoutLabel')}:</span>{' '}
                    {t('importantInfo.checkoutValue')}
                  </div>
                </div>
                <div className="flex items-start gap-3 py-2 border-b border-gray-100">
                  <Info className="w-4 h-4 text-purple-400 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">{t('importantInfo.documentsLabel')}:</span>{' '}
                    {t('importantInfo.documentsValue')}
                  </div>
                </div>
                <div className="flex items-start gap-3 py-2">
                  <AlertCircle className="w-4 h-4 text-amber-500 mt-0.5 shrink-0" />
                  <div>
                    <span className="font-medium text-gray-900">{t('importantInfo.earlyNoticeTitle')}:</span>{' '}
                    {t('importantInfo.earlyNoticeText')}
                  </div>
                </div>
              </div>

              {/* House Rules accordion */}
              <details className="group mt-3">
                <summary className="flex items-center gap-2 cursor-pointer select-none list-none text-sm font-medium text-gray-700 hover:text-gray-900 py-2 px-3 bg-gray-50 rounded-lg border border-gray-200 [&::-webkit-details-marker]:hidden">
                  <List className="w-4 h-4 text-gray-500 shrink-0" />
                  <span>{t('importantInfo.rulesTitle')}</span>
                  <span className="ml-auto text-gray-400 text-xs transition-transform group-open:rotate-180 inline-block">▼</span>
                </summary>
                <ol className="mt-2 space-y-1">
                  {houseRules.map((rule, idx) => (
                    <li key={idx} className="flex items-start gap-2 py-1.5 border-b border-gray-50 last:border-0 text-sm text-gray-600">
                      <span className="text-xs font-bold text-blue-400 mt-0.5 shrink-0 w-5 text-right">{idx + 1}.</span>
                      <span>{rule}</span>
                    </li>
                  ))}
                </ol>
              </details>
            </section>

            <hr className="border-gray-200" />

            {/* ── 2. Dining & Amenities ── */}
            <section>
              <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-3">
                <Utensils className="w-5 h-5 text-orange-500" />
                {t('dining.title')}
              </h2>

              {/* Meal times */}
              <h3 className="font-medium text-sm uppercase tracking-wide text-orange-600 mb-2">
                {t('dining.mealsTitle')}
              </h3>
              <div className="bg-orange-50 rounded-lg p-3 border border-orange-100 mb-1">
                <p className="text-xs text-orange-500 font-semibold uppercase text-center mb-2">{t('dining.breakfastLabel')}</p>
                <div className="grid grid-cols-2 gap-2 text-center text-xs">
                  <div>
                    <p className="text-gray-500">{t('dining.offSeasonLabel')}</p>
                    <p className="font-bold text-gray-800 mt-0.5">{t('dining.breakfastOffSeason')}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">{t('dining.mainSeasonLabel')}</p>
                    <p className="font-bold text-gray-800 mt-0.5">{t('dining.breakfastMainSeason')}</p>
                  </div>
                </div>
              </div>
              <p className="text-xs text-gray-400 text-center mb-4">{t('dining.locationValue')}</p>

              {/* Facilities */}
              <h3 className="font-medium text-sm uppercase tracking-wide text-blue-600 mb-2">
                {t('dining.facilitiesTitle')}
              </h3>
              <div className="space-y-2 text-sm text-gray-700">
                <div className="flex items-center gap-3">
                  <Wifi className="w-4 h-4 text-blue-500 shrink-0" />
                  <span>
                    <span className="font-medium">{t('dining.wifiLabel')}</span>
                    {' – '}
                    <span className="font-mono text-xs bg-gray-100 px-1.5 py-0.5 rounded text-gray-700">{t('dining.wifiPassword')}</span>
                  </span>
                </div>
                <div className="flex items-center gap-3">
                  <Car className="w-4 h-4 text-gray-500 shrink-0" />
                  <span><span className="font-medium">{t('dining.parkingLabel')}:</span> {t('dining.parkingValue')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <Luggage className="w-4 h-4 text-teal-500 shrink-0" />
                  <span><span className="font-medium">{t('dining.luggageLabel')}:</span> {t('dining.luggageValue')}</span>
                </div>
                <div className="flex items-center gap-3">
                  <PawPrint className="w-4 h-4 text-amber-500 shrink-0" />
                  <span><span className="font-medium">{t('dining.petsLabel')}:</span> {t('dining.petsValue')}</span>
                </div>
              </div>
            </section>

            <hr className="border-gray-200" />

            {/* ── 3. Contact Information ── */}
            <section>
              <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-3">
                <Phone className="w-5 h-5 text-green-600" />
                {t('contact.title')}
              </h2>

              <div className="grid grid-cols-2 gap-3 mb-3">
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide flex items-center gap-1">
                    <Phone className="w-3 h-3" />{t('contact.phoneLabel')}
                  </p>
                  <a href="tel:+38552451811" className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors">
                    +385 52 451 811
                  </a>
                </div>
<div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide flex items-center gap-1">
                    <Mail className="w-3 h-3" />{t('contact.emailLabel')}
                  </p>
                  <a href="mailto:info@hotelporec.com" className="text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors break-all">
                    info@hotelporec.com
                  </a>
                </div>
                <div className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide flex items-center gap-1">
                    <Globe className="w-3 h-3" />{t('contact.websiteLabel')}
                  </p>
                  <p className="text-sm font-medium text-gray-700">www.hotelporec.com</p>
                </div>
                <div className="col-span-2 p-3 bg-gray-50 rounded-lg border border-gray-200">
                  <p className="text-xs text-gray-500 mb-1 font-medium uppercase tracking-wide">
                    {t('contact.addressLabel')}
                  </p>
                  <p className="text-sm font-medium text-gray-800">{t('contact.addressValue')}</p>
                </div>
              </div>

              {/* In-room telephone */}
              <div className="p-3 bg-blue-50 rounded-lg border border-blue-100">
                <p className="text-xs font-semibold text-blue-700 uppercase tracking-wide mb-2">
                  {t('contact.inRoomTitle')}
                </p>
                <div className="grid grid-cols-3 gap-2 text-center">
                  <div>
                    <p className="text-3xl font-bold text-blue-700 leading-none">9</p>
                    <p className="text-xs text-gray-600 mt-1">{t('contact.inRoomReception')}</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-blue-700 leading-none">0</p>
                    <p className="text-xs text-gray-600 mt-1">{t('contact.inRoomOutside')}</p>
                  </div>
                  <div>
                    <p className="text-3xl font-bold text-blue-700 leading-none">#</p>
                    <p className="text-xs text-gray-600 mt-1">{t('contact.inRoomRoomToRoom')}</p>
                  </div>
                </div>
              </div>
            </section>

            <hr className="border-gray-200" />

            {/* ── 4. TV Channels ── */}
            <section>
              <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-3">
                <Tv className="w-5 h-5 text-indigo-500" />
                {t('tvChannels.title')}
              </h2>
              <div className="space-y-2">
                <div className="flex items-start gap-3 text-sm">
                  <span className="text-xs font-semibold text-red-600 shrink-0 w-24 pt-0.5">{t('tvChannels.croatianLabel')}</span>
                  <span className="text-gray-600 text-xs leading-relaxed">{TV_CHANNELS.hr.join(', ')}</span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <span className="text-xs font-semibold text-yellow-600 shrink-0 w-24 pt-0.5">{t('tvChannels.germanLabel')}</span>
                  <span className="text-gray-600 text-xs leading-relaxed">{TV_CHANNELS.de.join(', ')}</span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <span className="text-xs font-semibold text-green-600 shrink-0 w-24 pt-0.5">{t('tvChannels.italianLabel')}</span>
                  <span className="text-gray-600 text-xs leading-relaxed">{TV_CHANNELS.it.join(', ')}</span>
                </div>
                <div className="flex items-start gap-3 text-sm">
                  <span className="text-xs font-semibold text-blue-600 shrink-0 w-24 pt-0.5">{t('tvChannels.internationalLabel')}</span>
                  <span className="text-gray-600 text-xs leading-relaxed">{TV_CHANNELS.int.join(', ')}</span>
                </div>
              </div>
            </section>

            <hr className="border-gray-200" />

            {/* ── 5. Room Prices 2025 ── */}
            <section>
              <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-1">
                <Banknote className="w-5 h-5 text-emerald-600" />
                {t('prices.title')}
              </h2>
              <p className="text-xs text-gray-500 mb-3">{t('prices.subtitle')}</p>

              {/* Season legend */}
              <div className="grid grid-cols-2 gap-2 mb-3">
                {SEASONS.map((s) => (
                  <div key={s.key} className="bg-emerald-50 rounded-lg p-2 border border-emerald-100 text-xs">
                    <span className="font-bold text-emerald-700">{s.label}: </span>
                    <span className="text-gray-600 whitespace-pre-line">{s.dates}</span>
                  </div>
                ))}
              </div>

              {/* Price table */}
              <div className="overflow-x-auto rounded-lg border border-gray-200 mb-3">
                <table className="w-full text-xs">
                  <thead>
                    <tr className="bg-gray-100">
                      <th className="text-left p-2 text-gray-600 font-medium min-w-[120px]">{t('prices.roomLabel')}</th>
                      {SEASONS.map((s) => (
                        <th key={s.key} className="text-center p-2 text-gray-600 font-medium w-12">{s.key}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {roomRows.map((row, idx) => (
                      <tr key={idx} className={`border-t border-gray-100 ${row.superior ? 'bg-yellow-50' : ''}`}>
                        <td className="p-2 text-gray-700">
                          {row.label}
                          {row.note && <span className="text-gray-400 block">{row.note}</span>}
                        </td>
                        {row.prices.map((price, i) => (
                          <td key={i} className={`text-center p-2 font-semibold ${row.perApt ? 'text-purple-700' : 'text-emerald-700'}`}>
                            {price}€
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Children & Supplements */}
              <div className="grid grid-cols-2 gap-3 mb-3 text-xs">
                <div className="bg-blue-50 rounded-lg p-2.5 border border-blue-100">
                  <p className="font-semibold text-blue-700 mb-2">{t('prices.childrenTitle')}</p>
                  <div className="space-y-1 text-gray-700">
                    <div className="flex justify-between">
                      <span>{t('prices.children03')}</span>
                      <span className="font-medium text-green-600">{t('prices.children03Value')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('prices.children37')}</span>
                      <span className="font-medium">{t('prices.children37Value')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('prices.children714')}</span>
                      <span className="font-medium">{t('prices.children714Value')}</span>
                    </div>
                  </div>
                </div>
                <div className="bg-amber-50 rounded-lg p-2.5 border border-amber-100">
                  <p className="font-semibold text-amber-700 mb-2">{t('prices.supplementsTitle')}</p>
                  <div className="space-y-1 text-gray-700">
                    <div className="flex justify-between">
                      <span>{t('prices.suppPets')}</span>
                      <span className="font-medium">{t('prices.suppPetsValue')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('prices.suppParking')}</span>
                      <span className="font-medium">{t('prices.suppParkingValue')}</span>
                    </div>
                    <div className="flex justify-between">
                      <span>{t('prices.suppShortStay')}</span>
                      <span className="font-medium text-red-600">{t('prices.suppShortStayValue')}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Residence tax */}
              <div className="bg-gray-50 rounded-lg p-2.5 border border-gray-200 text-xs">
                <p className="font-semibold text-gray-700 mb-2">{t('prices.taxTitle')}</p>
                <div className="space-y-1 text-gray-600">
                  <div className="flex justify-between">
                    <span>{t('prices.taxLow')}</span>
                    <span className="font-medium">{t('prices.taxLowValue')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('prices.taxHigh')}</span>
                    <span className="font-medium">{t('prices.taxHighValue')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('prices.taxChildren1218')}</span>
                    <span className="font-medium">{t('prices.taxChildren1218Value')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span>{t('prices.taxChildren012')}</span>
                    <span className="font-medium text-green-600">{t('prices.taxChildren012Value')}</span>
                  </div>
                </div>
              </div>

              <p className="mt-2 text-xs text-gray-400 text-center">{t('prices.vatNote')}</p>
            </section>

            <hr className="border-gray-200" />

            {/* ── 6. Laundry & Ironing ── */}
            <section>
              <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-3">
                <RefreshCw className="w-5 h-5 text-cyan-600" />
                {t('laundry.title')}
              </h2>
              <p className="text-sm text-gray-600 mb-3">{t('laundry.description')}</p>
              <div className="space-y-1.5 text-sm text-gray-700">
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">{t('laundry.towelRentalLabel')}:</span>
                  <span className="font-medium text-right">{t('laundry.towelRentalValue')}</span>
                </div>
                <div className="flex justify-between gap-4">
                  <span className="text-gray-500">{t('laundry.towelLossLabel')}:</span>
                  <span className="font-medium text-right">{t('laundry.towelLossValue')}</span>
                </div>
              </div>
            </section>

            <hr className="border-gray-200" />

            {/* ── 7. Health & Emergency ── */}
            <section>
              <h2 className="flex items-center gap-2 text-lg font-semibold text-gray-900 mb-3">
                <HeartPulse className="w-5 h-5 text-red-500" />
                {t('health.title')}
              </h2>

              {/* Emergency numbers */}
              <div className="grid grid-cols-3 gap-2 mb-4">
                <div className="p-3 bg-red-50 rounded-lg border border-red-200 text-center">
                  <p className="text-3xl font-bold text-red-600 leading-none">194</p>
                  <p className="text-xs text-gray-600 mt-1">{t('health.medEmergencyLabel')}</p>
                </div>
                <div className="p-3 bg-orange-50 rounded-lg border border-orange-200 text-center">
                  <p className="text-3xl font-bold text-orange-600 leading-none">112</p>
                  <p className="text-xs text-gray-600 mt-1">{t('health.generalEmergencyLabel')}</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg border border-blue-200 text-center">
                  <p className="text-3xl font-bold text-blue-600 leading-none">9</p>
                  <p className="text-xs text-gray-600 mt-1">{t('health.receptionLabel')}</p>
                </div>
              </div>

              {/* EHIC note */}
              <div className="mb-4 p-3 bg-green-50 border border-green-200 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-4 h-4 text-green-600 shrink-0 mt-0.5" />
                <p className="text-xs text-green-800">{t('health.ehic')}</p>
              </div>

              {/* Local clinics */}
              <h3 className="font-medium text-sm text-gray-700 mb-2">{t('health.clinicsTitle')}</h3>
              <div className="space-y-2">
                {[
                  {
                    name: t('health.clinic2Name'),
                    address: t('health.clinic2Address'),
                    hours: t('health.clinic2Hours'),
                    phone: t('health.clinic2Phone'),
                    tel: '+38552434850',
                  },
                ].map((clinic, idx) => (
                  <div key={idx} className="p-3 bg-gray-50 rounded-lg border border-gray-200 text-xs">
                    <p className="font-semibold text-gray-800">{clinic.name}</p>
                    <p className="text-gray-500 mt-0.5">{clinic.address}</p>
                    <p className="text-gray-500">{clinic.hours}</p>
                    <a
                      href={`tel:${clinic.tel}`}
                      className="text-blue-600 font-medium mt-1 block hover:underline"
                    >
                      {clinic.phone}
                    </a>
                  </div>
                ))}
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
