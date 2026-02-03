import type { Place } from "@/lib/types";

/**
 * Returns the localized version of a bilingual field on a Place.
 * For example, getLocalizedField(place, "name", "ar") returns place.nameAr.
 */
export function getLocalizedField(
  place: Place,
  field: string,
  lang: "ar" | "en"
): string {
  const suffix = lang === "ar" ? "Ar" : "En";
  const key = `${field}${suffix}` as keyof Place;
  return (place[key] as string) ?? "";
}
