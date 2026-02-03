"use client";

import { useState, useMemo } from "react";
import type { Place } from "@/lib/types";
import { useLanguage } from "@/lib/i18n/language-context";
import Header from "@/components/header";
import SearchFilterBar from "@/components/search-filter-bar";
import PlaceCard from "@/components/place-card";
import Footer from "@/components/footer";

interface PlacesListingProps {
  places: Place[];
  governorates: string[];
  placeTypes: string[];
}

export default function PlacesListing({
  places,
  governorates,
  placeTypes,
}: PlacesListingProps) {
  const { t } = useLanguage();

  const [searchQuery, setSearchQuery] = useState("");
  const [governorateFilter, setGovernorateFilter] = useState("");
  const [placeTypeFilter, setPlaceTypeFilter] = useState("");

  const filteredPlaces = useMemo(() => {
    return places.filter((place) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase();
        const nameAr = place.nameAr.toLowerCase();
        const nameEn = place.nameEn.toLowerCase();
        if (!nameAr.includes(query) && !nameEn.includes(query)) {
          return false;
        }
      }

      if (governorateFilter && place.governorate !== governorateFilter) {
        return false;
      }

      if (placeTypeFilter && place.placeType !== placeTypeFilter) {
        return false;
      }

      return true;
    });
  }, [places, searchQuery, governorateFilter, placeTypeFilter]);

  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <SearchFilterBar
        governorates={governorates}
        placeTypes={placeTypes}
        onSearch={setSearchQuery}
        onFilterGovernorate={setGovernorateFilter}
        onFilterPlaceType={setPlaceTypeFilter}
      />

      <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-8 sm:px-6">
        {filteredPlaces.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {filteredPlaces.map((place, index) => (
              <PlaceCard key={place.slug || `place-${index}`} place={place} />
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-sand-dark">
              <svg
                width="28"
                height="28"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-navy/30"
                aria-hidden="true"
              >
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </div>
            <p className="text-lg font-bold text-navy/40">{t.noResults}</p>
          </div>
        )}
      </main>
      <Footer />
    </div>
  );
}
