# Khroga Places Listing - Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a bilingual (AR/EN) places listing website that reads from a CSV file and displays kids outing places in a cards grid with search and filtering.

**Architecture:** Next.js App Router with static generation. CSV data parsed at build time by a utility. i18n via language context + dictionary files with RTL/LTR switching. TailwindCSS for styling. Use `frontend-design` skill for all UI work.

**Tech Stack:** Next.js 16, React 19, TailwindCSS 4, TypeScript 5

---

### Task 1: CSV Data Layer — Types & Parser

**Files:**
- Create: `lib/types.ts`
- Create: `lib/csv-parser.ts`
- Create: `data/places.csv` (sample with 2-3 rows)

**Step 1: Create TypeScript types for a Place**

Create `lib/types.ts` with a `Place` interface mapping all 25 CSV columns to typed English field names:

```typescript
export interface Place {
  timestamp: string;
  nameAr: string;
  nameEn: string;
  descriptionAr: string;
  descriptionEn: string;
  addressAr: string;
  addressEn: string;
  governorate: string;
  area: string;
  mapLocation: string;
  placeType: string;
  price: string;
  priceUnit: string;
  suitableAge: string;
  placeNature: string;
  websiteLink: string;
  workingHours: string;
  familyFriendly: string;
  kidsFriendly: string;
  parking: string;
  reservationNeeded: string;
  socialMediaLinks: string;
  placePhotos: string;
  menuPhotos: string;
  notes: string;
  slug: string;
}
```

**Step 2: Create a sample CSV file**

Create `data/places.csv` with the exact Arabic headers from the Google Sheet and 2-3 sample rows of kids places data. This is for development/testing.

**Step 3: Create CSV parser utility**

Create `lib/csv-parser.ts`:
- Export `getAllPlaces(): Place[]` — reads `data/places.csv`, parses it, maps Arabic headers to English field names, generates a slug from the English name.
- Export `getPlaceBySlug(slug: string): Place | undefined`
- Export `getUniqueGovernorates(): string[]`
- Export `getUniquePlaceTypes(): string[]`
- Use simple CSV parsing (split by comma, handle quoted fields) — no external library needed.

**Step 4: Verify parser works**

Run: `npx tsx -e "import { getAllPlaces } from './lib/csv-parser'; console.log(JSON.stringify(getAllPlaces(), null, 2))"`

Expected: JSON array of 2-3 Place objects with all fields populated.

**Step 5: Commit**

```bash
git add lib/types.ts lib/csv-parser.ts data/places.csv
git commit -m "feat: add Place types, CSV parser, and sample data"
```

---

### Task 2: i18n Setup — Language Context & Dictionaries

**Files:**
- Create: `lib/i18n/dictionaries/en.json`
- Create: `lib/i18n/dictionaries/ar.json`
- Create: `lib/i18n/language-context.tsx`
- Create: `lib/i18n/utils.ts`

**Step 1: Create English dictionary**

Create `lib/i18n/dictionaries/en.json` with UI strings:

```json
{
  "siteName": "Khroga",
  "siteDescription": "Discover the best kids outing places",
  "searchPlaceholder": "Search places...",
  "filterGovernorate": "Governorate",
  "filterPlaceType": "Place Type",
  "allGovernorates": "All Governorates",
  "allTypes": "All Types",
  "price": "Price",
  "age": "Suitable Age",
  "workingHours": "Working Hours",
  "address": "Address",
  "familyFriendly": "Family Friendly",
  "kidsFriendly": "Kids Friendly",
  "parking": "Parking Available",
  "reservationNeeded": "Reservation Needed",
  "back": "Back",
  "noResults": "No places found",
  "yes": "Yes",
  "no": "No",
  "notes": "Notes",
  "socialMedia": "Social Media",
  "website": "Website",
  "viewOnMap": "View on Map",
  "description": "Description",
  "details": "Details",
  "photos": "Photos",
  "menu": "Menu"
}
```

**Step 2: Create Arabic dictionary**

Create `lib/i18n/dictionaries/ar.json` with the same keys, Arabic values.

**Step 3: Create language context**

Create `lib/i18n/language-context.tsx`:
- `LanguageProvider` wrapping children with language state (default: `ar`)
- `useLanguage()` hook returning `{ lang, setLang, t, dir }` where:
  - `lang` is `"ar" | "en"`
  - `setLang` toggles language and saves to `localStorage`
  - `t` is the dictionary for current language
  - `dir` is `"rtl"` or `"ltr"`

**Step 4: Create i18n utils**

Create `lib/i18n/utils.ts`:
- `getLocalizedField(place: Place, field: string, lang: "ar" | "en")` — returns the AR or EN version of a bilingual field (e.g., `nameAr` or `nameEn`)

**Step 5: Commit**

```bash
git add lib/i18n/
git commit -m "feat: add i18n with AR/EN dictionaries and language context"
```

---

### Task 3: Root Layout — Fonts, RTL/LTR, Language Provider

**Files:**
- Modify: `app/layout.tsx`
- Modify: `app/globals.css`

**Step 1: Update root layout**

Modify `app/layout.tsx`:
- Wrap `{children}` in `LanguageProvider`
- Add an Arabic-friendly font (e.g., `Cairo` from Google Fonts via `next/font/google`)
- Set `lang` and `dir` attributes on `<html>` dynamically based on language context
- Update metadata: title "Khroga - خروجة", description about kids places

**Step 2: Update globals.css**

Modify `app/globals.css`:
- Keep TailwindCSS import
- Add base styles suitable for bilingual layout
- Set Arabic font as default for `[dir="rtl"]`

**Step 3: Verify**

Run: `pnpm dev`
Expected: App loads without errors, page renders with updated title.

**Step 4: Commit**

```bash
git add app/layout.tsx app/globals.css
git commit -m "feat: update layout with i18n provider and bilingual font support"
```

---

### Task 4: Header Component — Logo & Language Switcher

**Files:**
- Create: `components/header.tsx`

**Step 1: Build Header component**

Use `frontend-design` skill for UI quality.

Create `components/header.tsx`:
- Site name "Khroga | خروجة" as logo/brand
- Language toggle button (AR/EN) using `useLanguage()` hook
- Sticky header, clean minimal design
- TailwindCSS, responsive

**Step 2: Add Header to layout or page**

Import and render `<Header />` at the top of the home page.

**Step 3: Verify**

Run: `pnpm dev`
Expected: Header displays with language switcher that toggles AR/EN and flips page direction.

**Step 4: Commit**

```bash
git add components/header.tsx
git commit -m "feat: add header with language switcher"
```

---

### Task 5: Search & Filter Bar Component

**Files:**
- Create: `components/search-filter-bar.tsx`

**Step 1: Build SearchFilterBar component**

Use `frontend-design` skill for UI quality.

Create `components/search-filter-bar.tsx`:
- Props: `governorates: string[]`, `placeTypes: string[]`, `onSearch`, `onFilterGovernorate`, `onFilterPlaceType`
- Text input for search (placeholder from dictionary)
- Dropdown for governorate filter
- Dropdown for place type filter
- Responsive: stack vertically on mobile, horizontal on desktop
- TailwindCSS styling

**Step 2: Commit**

```bash
git add components/search-filter-bar.tsx
git commit -m "feat: add search and filter bar component"
```

---

### Task 6: Place Card Component

**Files:**
- Create: `components/place-card.tsx`

**Step 1: Build PlaceCard component**

Use `frontend-design` skill for UI quality.

Create `components/place-card.tsx`:
- Props: `place: Place`, `lang: "ar" | "en"`
- Displays: place photo (or placeholder), name, type badge, governorate + area, price + unit, suitable age
- Links to `/places/[slug]`
- Hover effect, rounded corners, shadow
- TailwindCSS, responsive card sizing

**Step 2: Commit**

```bash
git add components/place-card.tsx
git commit -m "feat: add place card component"
```

---

### Task 7: Home Page — Assemble Listing

**Files:**
- Modify: `app/page.tsx`

**Step 1: Build the home page**

Use `frontend-design` skill for UI quality.

Modify `app/page.tsx`:
- Server component that calls `getAllPlaces()`, `getUniqueGovernorates()`, `getUniquePlaceTypes()`
- Renders `<Header />`, `<SearchFilterBar />`, and a grid of `<PlaceCard />` components
- Client component wrapper for search/filter state (filter locally in the browser)
- Responsive grid: 1 col mobile, 2 col tablet (`md:`), 3 col desktop (`lg:`)
- Show "No places found" message when filters return empty

**Step 2: Verify**

Run: `pnpm dev`
Expected: Home page shows header, search bar, filter dropdowns, and 2-3 sample place cards.

**Step 3: Commit**

```bash
git add app/page.tsx
git commit -m "feat: build home page with places listing grid"
```

---

### Task 8: Place Detail Page

**Files:**
- Create: `app/places/[slug]/page.tsx`

**Step 1: Build the detail page**

Use `frontend-design` skill for UI quality.

Create `app/places/[slug]/page.tsx`:
- `generateStaticParams()` from `getAllPlaces()` for static generation
- Server component fetching place by slug via `getPlaceBySlug()`
- Sections:
  - Back button linking to `/`
  - Photo gallery (place photos, menu photos) — display as image grid or simple gallery
  - Name + type badge + description
  - Info grid: address, working hours, price + unit, suitable age, place nature
  - Tags/badges: family friendly, kids friendly, parking, reservation needed
  - Map link button (opens Google Maps URL)
  - Social media links + website link
  - Notes section
- All text bilingual based on language context
- TailwindCSS, responsive

**Step 2: Verify**

Run: `pnpm dev`, navigate to `/places/[sample-slug]`
Expected: Full detail page renders with all place info.

**Step 3: Commit**

```bash
git add app/places/
git commit -m "feat: add place detail page with full info display"
```

---

### Task 9: Footer Component

**Files:**
- Create: `components/footer.tsx`

**Step 1: Build Footer component**

Use `frontend-design` skill for UI quality.

Create `components/footer.tsx`:
- Simple footer with "Khroga © 2026" and any relevant links
- TailwindCSS, minimal design

**Step 2: Add to layout or page**

Render `<Footer />` at the bottom of pages.

**Step 3: Commit**

```bash
git add components/footer.tsx
git commit -m "feat: add footer component"
```

---

### Task 10: Build Verification & Final Polish

**Step 1: Run production build**

Run: `pnpm build`
Expected: Build succeeds with no errors. Static pages generated for `/` and `/places/[slug]`.

**Step 2: Run lint**

Run: `pnpm lint`
Expected: No lint errors.

**Step 3: Test production locally**

Run: `pnpm start`
Expected: Site works — home page lists places, filters work, detail pages load, language switching works with RTL/LTR.

**Step 4: Final commit**

```bash
git commit -m "chore: verify production build and final polish"
```

---

## Summary

| Task | What | Files |
|------|------|-------|
| 1 | CSV Data Layer | `lib/types.ts`, `lib/csv-parser.ts`, `data/places.csv` |
| 2 | i18n Setup | `lib/i18n/dictionaries/*.json`, `lib/i18n/language-context.tsx`, `lib/i18n/utils.ts` |
| 3 | Root Layout | `app/layout.tsx`, `app/globals.css` |
| 4 | Header | `components/header.tsx` |
| 5 | Search & Filter Bar | `components/search-filter-bar.tsx` |
| 6 | Place Card | `components/place-card.tsx` |
| 7 | Home Page | `app/page.tsx` |
| 8 | Detail Page | `app/places/[slug]/page.tsx` |
| 9 | Footer | `components/footer.tsx` |
| 10 | Build Verification | — |
