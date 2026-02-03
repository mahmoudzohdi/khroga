"use client";

import { useLanguage } from "@/lib/i18n/language-context";

interface SearchFilterBarProps {
  governorates: string[];
  placeTypes: string[];
  onSearch: (query: string) => void;
  onFilterGovernorate: (governorate: string) => void;
  onFilterPlaceType: (placeType: string) => void;
}

export default function SearchFilterBar({
  governorates,
  placeTypes,
  onSearch,
  onFilterGovernorate,
  onFilterPlaceType,
}: SearchFilterBarProps) {
  const { t, dir } = useLanguage();

  return (
    <section
      dir={dir}
      className="w-full bg-sand-dark/60 px-4 py-4 md:py-5"
    >
      <div className="mx-auto flex max-w-6xl flex-col gap-3 md:flex-row md:items-center md:gap-3">
        {/* Search input */}
        <div className="relative min-w-0 flex-1">
          <svg
            className={`pointer-events-none absolute top-1/2 h-5 w-5 -translate-y-1/2 text-coral/60 ${
              dir === "rtl" ? "right-3.5" : "left-3.5"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
            />
          </svg>
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            onChange={(e) => onSearch(e.target.value)}
            className={`w-full rounded-2xl border-2 border-sand-dark bg-white py-3 text-sm text-navy placeholder-navy/35 shadow-sm transition-all duration-200 focus:border-coral/40 focus:shadow-md focus:shadow-coral/10 focus:outline-none ${
              dir === "rtl" ? "pr-11 pl-4" : "pl-11 pr-4"
            }`}
          />
        </div>

        {/* Governorate filter */}
        <div className="relative md:w-48">
          <select
            onChange={(e) => onFilterGovernorate(e.target.value)}
            defaultValue=""
            className="w-full appearance-none rounded-2xl border-2 border-sand-dark bg-white py-3 px-4 text-sm text-navy shadow-sm transition-all duration-200 focus:border-teal/40 focus:shadow-md focus:shadow-teal/10 focus:outline-none"
          >
            <option value="">{t.allGovernorates}</option>
            {governorates.map((gov) => (
              <option key={gov} value={gov}>
                {gov}
              </option>
            ))}
          </select>
          <svg
            className={`pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-teal/60 ${
              dir === "rtl" ? "left-3.5" : "right-3.5"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>

        {/* Place type filter */}
        <div className="relative md:w-48">
          <select
            onChange={(e) => onFilterPlaceType(e.target.value)}
            defaultValue=""
            className="w-full appearance-none rounded-2xl border-2 border-sand-dark bg-white py-3 px-4 text-sm text-navy shadow-sm transition-all duration-200 focus:border-amber/50 focus:shadow-md focus:shadow-amber/10 focus:outline-none"
          >
            <option value="">{t.allTypes}</option>
            {placeTypes.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <svg
            className={`pointer-events-none absolute top-1/2 h-4 w-4 -translate-y-1/2 text-amber/70 ${
              dir === "rtl" ? "left-3.5" : "right-3.5"
            }`}
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2.5}
            stroke="currentColor"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </div>
      </div>
    </section>
  );
}
