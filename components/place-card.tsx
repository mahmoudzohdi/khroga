"use client";

import Link from "next/link";
import type { Place } from "@/lib/types";
import { useLanguage } from "@/lib/i18n/language-context";
import { getLocalizedField } from "@/lib/i18n/utils";

interface PlaceCardProps {
  place: Place;
}

export default function PlaceCard({ place }: PlaceCardProps) {
  const { lang } = useLanguage();

  const name = getLocalizedField(place, "name", lang);

  return (
    <Link
      href={`/places/${place.slug}`}
      className="group flex flex-col overflow-hidden rounded-3xl border-2 border-sand-dark bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-coral/25 hover:shadow-xl hover:shadow-coral/10"
    >
      {/* Photo placeholder */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-gradient-to-br from-teal-light via-sand to-coral-light">
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex flex-col items-center gap-1">
            <svg
              width="40"
              height="40"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-teal/40"
              aria-hidden="true"
            >
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" />
              <circle cx="12" cy="9" r="2.5" fill="currentColor" stroke="none" />
            </svg>
          </div>
        </div>

        {/* Type badge */}
        {place.placeType && (
          <span className="absolute start-3 top-3 rounded-full bg-coral px-3 py-1 text-[11px] font-bold tracking-wide text-white shadow-sm">
            {place.placeType}
          </span>
        )}

        {/* Nature badge */}
        {place.placeNature && (
          <span className="absolute end-3 top-3 rounded-full bg-navy/70 px-2.5 py-1 text-[11px] font-semibold text-white backdrop-blur-sm">
            {place.placeNature}
          </span>
        )}
      </div>

      {/* Card body */}
      <div className="flex flex-1 flex-col gap-2 p-4">
        {/* Name */}
        <h3 className="line-clamp-1 text-lg font-extrabold leading-tight text-navy transition-colors group-hover:text-coral">
          {name}
        </h3>

        {/* Location */}
        {(place.governorate || place.area) && (
          <div className="flex items-center gap-1.5 text-sm text-navy/50">
            <svg
              width="13"
              height="13"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="shrink-0 text-teal/60"
              aria-hidden="true"
            >
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
              <circle cx="12" cy="10" r="3" />
            </svg>
            <span className="line-clamp-1">
              {[place.governorate, place.area].filter(Boolean).join(" - ")}
            </span>
          </div>
        )}

        {/* Price + Age row */}
        <div className="mt-auto flex flex-wrap items-center gap-2 pt-2">
          {place.price && (
            <span className="inline-flex items-center gap-1 rounded-xl bg-amber-light px-2.5 py-1 text-xs font-bold text-navy/70">
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 text-amber"
                aria-hidden="true"
              >
                <line x1="12" y1="1" x2="12" y2="23" />
                <path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
              </svg>
              {place.price}
              {place.priceUnit && (
                <span className="font-medium text-navy/40">
                  / {place.priceUnit}
                </span>
              )}
            </span>
          )}

          {place.suitableAge && (
            <span className="inline-flex items-center gap-1 rounded-xl bg-teal-light px-2.5 py-1 text-xs font-bold text-navy/70">
              <svg
                width="11"
                height="11"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="shrink-0 text-teal"
                aria-hidden="true"
              >
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                <circle cx="12" cy="7" r="4" />
              </svg>
              {place.suitableAge}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
