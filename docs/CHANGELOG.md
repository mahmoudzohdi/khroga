# Khroga - Project Changelog

## 2026-02-03

### Initial Setup
- Ran `pnpm install` to install all project dependencies (348 packages added)
- Project stack: Next.js 16.1.6, React 19.2.3, TailwindCSS 4.1.18, TypeScript 5.9.3
- Created `docs/` directory for project documentation

### Places Listing Feature — Full Implementation
- **Data Layer**: Created `Place` TypeScript interface (`lib/types.ts`), CSV parser (`lib/csv-parser.ts`) that reads Arabic-header CSV and maps to typed fields, sample data (`data/places.csv`) with 3 Egyptian kids places
- **i18n**: Bilingual AR/EN support with dictionary files (`lib/i18n/dictionaries/`), language context provider (`lib/i18n/language-context.tsx`), and localization utils (`lib/i18n/utils.ts`). Arabic is the default language.
- **Root Layout**: Updated with Cairo font for Arabic, Geist for English, RTL/LTR support, LanguageProvider wrapper
- **Header**: Sticky header with "Khroga | خروجة" branding and AR/EN language toggle (`components/header.tsx`)
- **Search & Filter Bar**: Search by name + filter by governorate and place type (`components/search-filter-bar.tsx`)
- **Place Card**: Responsive card with photo, name, type badge, location, price, age range (`components/place-card.tsx`)
- **Home Page**: Server component feeding data to client-side listing with search/filter state (`app/page.tsx`, `components/places-listing.tsx`)
- **Detail Page**: Full place info with photo gallery, info grid, tags, map link, social links (`app/places/[slug]/page.tsx`, `components/place-detail.tsx`)
- **Footer**: Simple bilingual footer (`components/footer.tsx`)
- **Build**: Production build passes, ESLint clean, 7 static pages generated
