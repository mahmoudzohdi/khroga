# Khroga - Places Listing Design

## Overview
A bilingual (AR/EN) Next.js website that displays kids outing places collected via Google Form. Data is imported from Google Sheets as a CSV file.

## Data Source
- CSV file at `data/places.csv` exported from Google Sheets
- 25 columns including: name (AR/EN), description (AR/EN), address (AR/EN), governorate, area, map location, place type, price, price unit, suitable age, nature (indoor/outdoor), website, working hours, family/kids friendly, parking, reservation needed, social media links, photos, menu photos, notes

## Data Flow
1. Export CSV from Google Sheets → place in `data/places.csv`
2. Parser utility reads CSV, maps Arabic headers to typed English field names
3. Next.js server components parse at build time (static generation)
4. Pages are statically generated — fast, no runtime API calls

## Routes
- `/` — Home page: search/filters + cards grid listing all places
- `/places/[slug]` — Detail page per place (slug derived from English name)

## i18n
- AR/EN language switcher
- Middleware + cookies for language persistence
- Arabic = RTL, English = LTR
- UI strings from dictionary files; place data already bilingual from sheet

## UI Components

### Home Page (`/`)
- Header: logo/name "Khroga" + language switcher
- Search bar + filter dropdowns (governorate, place type)
- Responsive cards grid (1 col mobile, 2 tablet, 3 desktop)
- Card: photo, name, type badge, area/governorate, price, suitable age
- Footer

### Detail Page (`/places/[slug]`)
- Back button
- Photo gallery (place + menu photos)
- Name, type badge, description
- Info: address, working hours, price + unit, suitable age, nature
- Tags: family friendly, kids friendly, parking, reservation needed
- Map link (Google Maps)
- Social media + website links
- Notes section

### Shared
- Language switcher component
- Mobile-first responsive design
- TailwindCSS for all styling

## Tech Stack
- Next.js 16.1.6 (App Router)
- React 19.2.3
- TailwindCSS 4.1.18
- TypeScript 5.9.3

## Filtering
- Search by place name
- Filter by governorate
- Filter by place type
