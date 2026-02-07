"use client";

import Link from "next/link";
import type { Place } from "@/lib/types";
import { useLanguage } from "@/lib/i18n/language-context";
import { getLocalizedField } from "@/lib/i18n/utils";
import Header from "@/components/header";
import Footer from "@/components/footer";

interface PlaceDetailProps {
  place: Place;
}

/* ------------------------------------------------------------------ */
/*  Tiny inline SVG icon components                                   */
/* ------------------------------------------------------------------ */

function IconArrowBack() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M19 12H5" />
      <path d="M12 19l-7-7 7-7" />
    </svg>
  );
}

function IconMapPin() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function IconClock() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <polyline points="12 6 12 12 16 14" />
    </svg>
  );
}

function IconDollar() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="12" y1="1" x2="12" y2="23" />
      <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
    </svg>
  );
}

function IconUser() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function IconSun() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="5" />
      <line x1="12" y1="1" x2="12" y2="3" />
      <line x1="12" y1="21" x2="12" y2="23" />
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
      <line x1="1" y1="12" x2="3" y2="12" />
      <line x1="21" y1="12" x2="23" y2="12" />
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
    </svg>
  );
}

function IconCheck() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polyline points="20 6 9 17 4 12" />
    </svg>
  );
}

function IconX() {
  return (
    <svg
      width="14"
      height="14"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="3"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <line x1="18" y1="6" x2="6" y2="18" />
      <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
  );
}

function IconMap() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <polygon points="1 6 1 22 8 18 16 22 23 18 23 2 16 6 8 2 1 6" />
      <line x1="8" y1="2" x2="8" y2="18" />
      <line x1="16" y1="6" x2="16" y2="22" />
    </svg>
  );
}

function IconGlobe() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="12" cy="12" r="10" />
      <path d="M2 12h20" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </svg>
  );
}

function IconShare() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <circle cx="18" cy="5" r="3" />
      <circle cx="6" cy="12" r="3" />
      <circle cx="18" cy="19" r="3" />
      <line x1="8.59" y1="13.51" x2="15.42" y2="17.49" />
      <line x1="15.41" y1="6.51" x2="8.59" y2="10.49" />
    </svg>
  );
}

function IconPhone() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function IconNote() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
      <polyline points="14 2 14 8 20 8" />
      <line x1="16" y1="13" x2="8" y2="13" />
      <line x1="16" y1="17" x2="8" y2="17" />
      <polyline points="10 9 9 9 8 9" />
    </svg>
  );
}

function IconPhoto() {
  return (
    <svg
      width="48"
      height="48"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
      <circle cx="8.5" cy="8.5" r="1.5" />
      <polyline points="21 15 16 10 5 21" />
    </svg>
  );
}

/* ------------------------------------------------------------------ */
/*  Helper: determine if a yes/no field is truthy                     */
/* ------------------------------------------------------------------ */

function isTruthy(value: string): boolean {
  const v = value.trim().toLowerCase();
  return (
    v === "yes" ||
    v === "نعم" ||
    v === "أيوه" ||
    v === "اه" ||
    v === "ايوه" ||
    v === "true" ||
    v === "1"
  );
}

/* ------------------------------------------------------------------ */
/*  Main component                                                    */
/* ------------------------------------------------------------------ */

export default function PlaceDetail({ place }: PlaceDetailProps) {
  const { lang, t, dir } = useLanguage();

  const name = getLocalizedField(place, "name", lang);
  const description = getLocalizedField(place, "description", lang);
  const address = getLocalizedField(place, "address", lang);

  // Parse social media links (comma-separated or newline-separated)
  const socialLinks = place.socialMediaLinks
    ? place.socialMediaLinks
        .split(/[,\n]+/)
        .map((u) => u.trim())
        .filter(Boolean)
    : [];

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-teal-50/40 via-white to-amber-50/30">
      <Header />

      <main className="mx-auto w-full max-w-5xl flex-1 px-4 py-6 sm:px-6 lg:px-8">
        {/* ---- Back button ---- */}
        <Link
          href="/"
          className="mb-6 inline-flex items-center gap-2 rounded-xl bg-white px-4 py-2.5 text-sm font-semibold text-teal-700 shadow-sm ring-1 ring-teal-100 transition-all hover:bg-teal-50 hover:shadow-md active:scale-95"
        >
          <span className={dir === "rtl" ? "rotate-180" : ""}>
            <IconArrowBack />
          </span>
          {t.back}
        </Link>

        {/* ---- Photo placeholder ---- */}
        <section className="mb-8">
          <div className="flex aspect-[16/7] items-center justify-center rounded-2xl bg-gradient-to-br from-teal-50 via-teal-100 to-amber-50">
            <div className="text-center text-teal-300">
              <IconPhoto />
              <p className="mt-2 text-sm font-medium">{t.photos}</p>
            </div>
          </div>
        </section>

        {/* ---- Name + type badge + description ---- */}
        <section className="mb-8">
          <div className="flex flex-wrap items-start gap-3">
            <h1 className="text-3xl font-extrabold tracking-tight text-gray-900 sm:text-4xl">
              {name}
            </h1>
            {place.placeType && (
              <span className="mt-1 shrink-0 rounded-full bg-teal-100 px-4 py-1.5 text-sm font-semibold text-teal-700">
                {place.placeType}
              </span>
            )}
          </div>

          {description && (
            <p className="mt-4 max-w-3xl leading-relaxed text-gray-600">
              {description}
            </p>
          )}
        </section>

        {/* ---- Info grid ---- */}
        <section className="mb-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {address && (
            <InfoCard
              icon={<IconMapPin />}
              label={t.address}
              value={address}
            />
          )}
          {place.workingHours && (
            <InfoCard
              icon={<IconClock />}
              label={t.workingHours}
              value={place.workingHours}
            />
          )}
          {place.price && (
            <InfoCard
              icon={<IconDollar />}
              label={t.price}
              value={
                place.priceUnit
                  ? `${place.price} / ${place.priceUnit}`
                  : place.price
              }
            />
          )}
          {place.suitableAge && (
            <InfoCard
              icon={<IconUser />}
              label={t.age}
              value={place.suitableAge}
            />
          )}
          {place.placeNature && (
            <InfoCard
              icon={<IconSun />}
              label={lang === "ar" ? "طبيعة المكان" : "Place Nature"}
              value={place.placeNature}
            />
          )}
          {place.phoneNumber && (
            <InfoCard
              icon={<IconPhone />}
              label={t.phone}
              value={place.phoneNumber}
              isPhone
            />
          )}
        </section>

        {/* ---- Tags / Badges ---- */}
        <section className="mb-8 flex flex-wrap gap-3">
          <TagBadge
            label={t.familyFriendly}
            active={isTruthy(place.familyFriendly)}
            yesLabel={t.yes}
            noLabel={t.no}
          />
          <TagBadge
            label={t.kidsFriendly}
            active={isTruthy(place.kidsFriendly)}
            yesLabel={t.yes}
            noLabel={t.no}
          />
          <TagBadge
            label={t.parking}
            active={isTruthy(place.parking)}
            yesLabel={t.yes}
            noLabel={t.no}
          />
          <TagBadge
            label={t.reservationNeeded}
            active={isTruthy(place.reservationNeeded)}
            yesLabel={t.yes}
            noLabel={t.no}
          />
        </section>

        {/* ---- Map link ---- */}
        {place.mapLocation && (
          <section className="mb-8">
            <a
              href={place.mapLocation}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2.5 rounded-xl bg-teal-600 px-6 py-3 text-sm font-bold text-white shadow-md transition-all hover:bg-teal-700 hover:shadow-lg active:scale-95"
            >
              <IconMap />
              {t.viewOnMap}
            </a>
          </section>
        )}

        {/* ---- Social media + website ---- */}
        {(socialLinks.length > 0 || place.websiteLink) && (
          <section className="mb-8 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-teal-100">
            <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
              <span className="text-teal-500">
                <IconShare />
              </span>
              {t.socialMedia}
            </h2>

            <div className="flex flex-wrap gap-3">
              {socialLinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-teal-50 px-4 py-2 text-sm font-medium text-teal-700 ring-1 ring-teal-100 transition-colors hover:bg-teal-100"
                >
                  <IconGlobe />
                  {extractDomain(link)}
                </a>
              ))}

              {place.websiteLink && (
                <a
                  href={place.websiteLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 rounded-lg bg-amber-50 px-4 py-2 text-sm font-medium text-amber-700 ring-1 ring-amber-100 transition-colors hover:bg-amber-100"
                >
                  <IconGlobe />
                  {t.website}
                </a>
              )}
            </div>
          </section>
        )}

        {/* ---- Notes ---- */}
        {place.notes && place.notes.trim() && (
          <section className="mb-8 rounded-2xl bg-amber-50 p-6 shadow-sm ring-1 ring-amber-100">
            <h2 className="mb-3 flex items-center gap-2 text-lg font-bold text-gray-900">
              <span className="text-amber-500">
                <IconNote />
              </span>
              {t.notes}
            </h2>
            <p className="leading-relaxed text-gray-700 whitespace-pre-line">
              {place.notes}
            </p>
          </section>
        )}
      </main>

      <Footer />
    </div>
  );
}

/* ------------------------------------------------------------------ */
/*  Sub-components                                                    */
/* ------------------------------------------------------------------ */

function InfoCard({
  icon,
  label,
  value,
  isPhone,
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  isPhone?: boolean;
}) {
  // Split phone numbers by common separators for clickable links
  const phoneNumbers = isPhone
    ? value.split(/[/،,]+/).map((n) => n.trim()).filter(Boolean)
    : [];

  return (
    <div className="flex items-start gap-3 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-teal-100 overflow-hidden">
      <span className="mt-0.5 shrink-0 text-teal-500">{icon}</span>
      <div className="min-w-0 flex-1">
        <p className="text-xs font-semibold uppercase tracking-wide text-gray-400">
          {label}
        </p>
        {isPhone ? (
          <div className="mt-0.5 flex flex-wrap gap-x-3 gap-y-1">
            {phoneNumbers.map((num, idx) => (
              <a
                key={idx}
                href={`tel:${num.replace(/\s+/g, "")}`}
                className="text-sm font-medium text-teal-700 underline decoration-teal-300 underline-offset-2 transition-colors hover:text-teal-900 hover:decoration-teal-500"
                dir="ltr"
              >
                {num}
              </a>
            ))}
          </div>
        ) : (
          <p className="mt-0.5 text-sm font-medium text-gray-800 whitespace-pre-line break-words">
            {value}
          </p>
        )}
      </div>
    </div>
  );
}

function TagBadge({
  label,
  active,
  yesLabel,
  noLabel,
}: {
  label: string;
  active: boolean;
  yesLabel: string;
  noLabel: string;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold ${
        active
          ? "bg-emerald-100 text-emerald-700 ring-1 ring-emerald-200"
          : "bg-gray-100 text-gray-500 ring-1 ring-gray-200"
      }`}
    >
      {active ? <IconCheck /> : <IconX />}
      {label}
      <span className="text-xs font-normal opacity-70">
        ({active ? yesLabel : noLabel})
      </span>
    </span>
  );
}

/* ------------------------------------------------------------------ */
/*  Utility                                                           */
/* ------------------------------------------------------------------ */

function extractDomain(url: string): string {
  try {
    const hostname = new URL(url).hostname.replace("www.", "");
    return hostname;
  } catch {
    return url;
  }
}
