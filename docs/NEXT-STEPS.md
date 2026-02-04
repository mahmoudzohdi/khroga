# Khroga - Next Steps

Prioritized list of improvements and features to implement.

---

## Priority 1 — Deploy & Go Live

### 1.1 Initialize Git & Push to GitHub
- `git init`, create `.gitignore`, initial commit
- Create GitHub repository
- Push code

### 1.2 Deploy to Vercel
- Connect GitHub repo to Vercel
- Vercel auto-detects Next.js — no special config needed
- Build command: `pnpm build`, output: `.next`
- Set up custom domain if available

### 1.3 Set Up CSV Update Workflow
- Document the process for the team: export CSV → replace file → push → auto-deploy
- Consider a GitHub Action that triggers rebuild on CSV changes

---

## Priority 2 — Image Support

### 2.1 Solve the Image Problem
Current state: Place photos are private Google Drive links that require authentication.

**Options (pick one):**

| Option | Effort | Pros | Cons |
|--------|--------|------|------|
| Make Drive images public | Low | No code changes | Relies on Google Drive, limited control |
| Upload to Cloudinary (free tier) | Medium | Fast CDN, image optimization, 25GB free | Need to migrate URLs |
| Store in `public/images/` | Low | No external dependency | Increases repo size, manual management |
| Use Google Sheets API to serve images | High | Automated | Complex setup, API quota limits |

**Recommended:** Cloudinary free tier — upload images there, update CSV with Cloudinary URLs. Next.js Image optimization works well with it.

### 2.2 Update Components
- Re-enable `next/image` in `place-card.tsx` and `place-detail.tsx`
- Add Cloudinary (or chosen host) to `next.config.ts` remote patterns
- Add image loading states and error fallbacks

---

## Priority 3 — Content & UX Improvements

### 3.1 Add More Filters
- Filter by age range
- Filter by price range
- Filter by indoor/outdoor
- Filter by parking, reservation needed, family/kids friendly
- "Clear all filters" button

### 3.2 Improve Search
- Search across description, address, and notes (not just name)
- Debounce search input for better performance with more data
- Show match count ("showing 12 of 45 places")

### 3.3 Sort Options
- Sort by name (A-Z / ا-ي)
- Sort by price (low to high / high to low)
- Sort by newest added

### 3.4 Home Page Hero Section
- Add a hero banner above the search bar with tagline and illustration
- Brief intro about what Khroga is

### 3.5 Place Detail Page Improvements
- Photo carousel/lightbox when images are available
- "Share this place" button (copy link, WhatsApp, etc.)
- Related/nearby places section
- Breadcrumb navigation

---

## Priority 4 — Data & Automation

### 4.1 Google Sheets API Integration
- Replace manual CSV export with automated Google Sheets API fetch
- Fetch at build time using a service account
- Set up ISR (Incremental Static Regeneration) to refresh data periodically

### 4.2 Admin Panel
- Simple admin page to trigger data refresh
- Preview new places before publishing
- Edit/hide individual places

### 4.3 Form Validation & Data Quality
- Add validation rules in the CSV parser for malformed data
- Handle missing required fields gracefully
- Log/report data quality issues

---

## Priority 5 — Features

### 5.1 Map View
- Toggle between cards grid and map view
- Show all places as pins on an embedded Google Map
- Click pin to see place summary

### 5.2 Favorites / Bookmarks
- Allow users to bookmark places (localStorage-based, no auth needed)
- "My Favorites" section

### 5.3 Categories Landing Pages
- `/category/indoor` — all indoor places
- `/category/outdoor` — all outdoor places
- Better SEO for specific searches

### 5.4 Place Ratings & Reviews
- Allow users to rate places (requires backend/database)
- Display average rating on cards
- Review submission form

### 5.5 PWA Support
- Add service worker for offline access
- Install prompt for mobile users
- Cache place data for offline browsing

---

## Priority 6 — Technical Improvements

### 6.1 SEO
- Add Open Graph meta tags per place (dynamic)
- Generate sitemap.xml
- Add robots.txt
- Structured data (JSON-LD) for places

### 6.2 Performance
- Implement image lazy loading and blur placeholders
- Add loading skeletons for cards
- Consider pagination or infinite scroll for large datasets

### 6.3 Analytics
- Add Vercel Analytics or Google Analytics
- Track popular places, search queries, filter usage

### 6.4 Testing
- Add unit tests for CSV parser
- Add component tests for key UI components
- Add E2E tests for critical user flows

### 6.5 Database Migration
- When data grows or dynamic features are needed, migrate from CSV to:
  - SQLite (simplest, file-based)
  - Supabase (free tier, PostgreSQL + auth)
  - PlanetScale (free tier, MySQL)
- Write import script to load CSV into database
- Update data layer to query database instead of CSV
