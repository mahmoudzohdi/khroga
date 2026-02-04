# Khroga - Current Implementation State

**Last updated:** 2026-02-03

## Overview

Khroga (خروجة) is a bilingual (Arabic/English) Next.js website that lists kids outing places in Egypt. Place data is collected via Google Forms, exported as CSV, and displayed as a browsable directory with search and filtering.

## Tech Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| Next.js | 16.1.6 | App Router, SSG, server components |
| React | 19.2.3 | UI framework |
| TailwindCSS | 4.1.18 | Styling |
| TypeScript | 5.9.3 | Type safety |
| pnpm | 10.28.2 | Package manager |

## Architecture

### Data Flow

```
Google Form → Google Sheet → CSV export → data/places.csv → CSV parser → Next.js SSG → Static HTML
```

- No database. CSV file is the data store.
- CSV is parsed at build time by `lib/csv-parser.ts`.
- All pages are statically generated (SSG) — no runtime API calls.
- To update data: export new CSV from Google Sheets, replace `data/places.csv`, redeploy.

### i18n

- Arabic is the default language.
- Language state managed via React Context (`lib/i18n/language-context.tsx`).
- User preference saved to `localStorage`.
- UI strings from dictionary files (`lib/i18n/dictionaries/ar.json`, `en.json`).
- Place data is natively bilingual (AR + EN fields in CSV).
- RTL/LTR applied dynamically via `document.documentElement.dir`.

### Routing

| Route | Type | Description |
|-------|------|-------------|
| `/` | Static | Home page — search, filters, place cards grid |
| `/places/[slug]` | SSG | Detail page per place (slug from English name) |

### Design System — "Sunny Playground"

| Token | Hex | Usage |
|-------|-----|-------|
| Sand | `#faf6f1` | Body background |
| Sand Dark | `#f0e9df` | Card borders, input borders |
| Coral | `#f4845f` | Primary accent, badges, hover states |
| Teal | `#2a9d8f` | Secondary accent, icons |
| Navy | `#264653` | Text, footer background |
| Amber | `#e9c46a` | Tertiary accent, price badges |

**Fonts:** Baloo 2 (headings), Cairo (Arabic body), Geist (English body)

Dark mode is explicitly disabled — light theme only.

## Project Structure

```
khroga/
├── app/
│   ├── globals.css              # Global styles, color tokens, dark mode override
│   ├── layout.tsx               # Root layout: fonts, metadata, LanguageProvider
│   ├── page.tsx                 # Home page (server component, loads CSV data)
│   └── places/[slug]/
│       └── page.tsx             # Detail page (server component, generateStaticParams)
├── components/
│   ├── header.tsx               # Sticky header with logo + language toggle
│   ├── footer.tsx               # Navy footer with branding
│   ├── search-filter-bar.tsx    # Search input + governorate/type dropdowns
│   ├── place-card.tsx           # Card component for the grid
│   ├── place-detail.tsx         # Full detail view with info grid, tags, links
│   └── places-listing.tsx       # Client wrapper: assembles header, filters, grid
├── data/
│   └── places.csv               # Place data (exported from Google Sheets)
├── lib/
│   ├── types.ts                 # Place interface (26 fields)
│   ├── csv-parser.ts            # CSV parser: getAllPlaces, getPlaceBySlug, etc.
│   └── i18n/
│       ├── language-context.tsx  # LanguageProvider + useLanguage hook
│       ├── utils.ts             # getLocalizedField helper
│       └── dictionaries/
│           ├── ar.json          # Arabic UI strings
│           └── en.json          # English UI strings
├── docs/
│   ├── CHANGELOG.md             # Project changelog
│   ├── CURRENT-STATE.md         # This file
│   └── plans/                   # Design and implementation plans
├── public/                      # Static assets
├── next.config.ts               # Next.js config (minimal)
├── package.json
├── tsconfig.json
└── postcss.config.mjs
```

## CSV Data Format

The CSV uses Arabic column headers matching the Google Form fields. The parser maps them to English field names:

| CSV Header (Arabic) | Field Name | Content |
|---------------------|------------|---------|
| طابع زمني | timestamp | Form submission time |
| اسم المكان بالعربي | nameAr | Arabic name |
| اسم المكان بالانجليزيه | nameEn | English name |
| وصف المكان بالعربي | descriptionAr | Arabic description |
| وصف المكان بالانجليزيه | descriptionEn | English description |
| عنوان المكان بالعربي | addressAr | Arabic address |
| عنوان المكان بالانجليزيه | addressEn | English address |
| المحافظه | governorate | Egyptian governorate |
| المنطقه | area | District/area |
| المكان على الخريطه | mapLocation | Google Maps URL |
| نوع المكان | placeType | Category (e.g., ملاهي) |
| السعر | price | Price info |
| الوحده للسعر | priceUnit | Price unit (ticket, card, etc.) |
| السن المناسب للمكان | suitableAge | Age range |
| طبيعة المكان | placeNature | Indoor/Outdoor |
| لينك الموقع الالكتروني | websiteLink | Website URL |
| مواعيد العمل | workingHours | Operating hours |
| مناسب للعائلات | familyFriendly | Yes/No |
| مناسب للاطفال | kidsFriendly | Yes/No |
| متاح موقف للسيارات (Parking) | parking | Yes/No |
| محتاج حجز؟ | reservationNeeded | Yes/No |
| لينكات صفحات التواصل الاجتماعي | socialMediaLinks | Social media URLs |
| صور للمكان | placePhotos | Image URLs (comma-separated) |
| صور المنيو | menuPhotos | Menu image URLs |
| ملاحظات | notes | Additional notes |

**Parser features:**
- Handles multiline quoted fields (addresses with map links, working hours, notes)
- Trims headers to handle trailing spaces from Google Sheets export
- Generates unique URL slugs from English names
- Skips rows with no name
- Caches parsed results in memory

## How to Update Place Data

1. Open the Google Sheet linked to the form
2. File → Download → Comma Separated Values (.csv)
3. Replace `data/places.csv` with the downloaded file
4. Redeploy (or run `pnpm build` locally)

## Commands

```bash
pnpm dev        # Start dev server
pnpm build      # Production build (generates static pages)
pnpm start      # Serve production build locally
pnpm lint       # Run ESLint
```

## Current Limitations

- **No images**: Place photos are Google Drive links that require authentication. Placeholders are shown instead.
- **No database**: CSV-only data store. Must redeploy to update data.
- **Basic filtering**: Search by name + filter by governorate and place type only.
- **No user accounts**: Public read-only site.
- **Not yet deployed**: No git repo or hosting configured.
