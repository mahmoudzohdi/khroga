import fs from "fs";
import path from "path";
import type { Place } from "./types";

/**
 * Mapping from Arabic CSV headers to Place field names.
 * Keys are trimmed during lookup to handle trailing spaces.
 */
const HEADER_MAP: Record<string, keyof Place> = {
  "طابع زمني": "timestamp",
  "اسم المكان بالعربي": "nameAr",
  "اسم المكان بالانجليزيه": "nameEn",
  "وصف المكان بالعربي": "descriptionAr",
  "وصف المكان بالانجليزيه": "descriptionEn",
  "عنوان المكان بالعربي": "addressAr",
  "عنوان المكان بالانجليزيه": "addressEn",
  "المحافظه": "governorate",
  "المنطقه": "area",
  "المكان على الخريطه": "mapLocation",
  "نوع المكان": "placeType",
  "السعر": "price",
  "الوحده للسعر": "priceUnit",
  "السن المناسب للمكان": "suitableAge",
  "طبيعة المكان": "placeNature",
  "لينك الموقع الالكتروني": "websiteLink",
  "مواعيد العمل": "workingHours",
  "مناسب للعائلات": "familyFriendly",
  "مناسب للاطفال": "kidsFriendly",
  "متاح موقف للسيارات (Parking)": "parking",
  "محتاج حجز؟": "reservationNeeded",
  "لينكات صفحات التواصل الاجتماعي (فيسبوك، انستجرام، الخ)": "socialMediaLinks",
  "رقم التليفون": "phoneNumber",
  "صور للمكان": "placePhotos",
  "صور المنيو (في حاله مطعم/كافيه)": "menuPhotos",
  "ملاحظات": "notes",
};

/**
 * Parse CSV content into rows of fields, correctly handling:
 * - Quoted fields containing commas
 * - Quoted fields containing newlines (multiline fields)
 * - Escaped quotes ("" inside quoted fields)
 */
function parseCsv(content: string): string[][] {
  const rows: string[][] = [];
  let current = "";
  let inQuotes = false;
  let fields: string[] = [];

  for (let i = 0; i < content.length; i++) {
    const char = content[i];

    if (inQuotes) {
      if (char === '"') {
        // Check for escaped quote ("")
        if (i + 1 < content.length && content[i + 1] === '"') {
          current += '"';
          i++; // skip next quote
        } else {
          inQuotes = false;
        }
      } else {
        current += char;
      }
    } else {
      if (char === '"') {
        inQuotes = true;
      } else if (char === ",") {
        fields.push(current.trim());
        current = "";
      } else if (char === "\n" || char === "\r") {
        // Handle \r\n
        if (char === "\r" && i + 1 < content.length && content[i + 1] === "\n") {
          i++;
        }
        // End of row
        fields.push(current.trim());
        if (fields.some((f) => f !== "")) {
          rows.push(fields);
        }
        fields = [];
        current = "";
      } else {
        current += char;
      }
    }
  }

  // Push final row if there's content
  fields.push(current.trim());
  if (fields.some((f) => f !== "")) {
    rows.push(fields);
  }

  return rows;
}

/**
 * Generate a URL-friendly slug from an English name.
 */
function generateSlug(nameEn: string): string {
  return nameEn
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * Read and parse the CSV file, returning all places.
 */
let cachedPlaces: Place[] | null = null;

export function getAllPlaces(): Place[] {
  if (cachedPlaces) {
    return cachedPlaces;
  }

  const csvPath = path.join(process.cwd(), "data", "places.csv");
  const csvContent = fs.readFileSync(csvPath, "utf-8");
  const rows = parseCsv(csvContent);

  if (rows.length < 2) {
    return [];
  }

  // Parse headers — trim each header to handle trailing spaces
  const headers = rows[0];

  // Map header indices to Place field names
  const fieldIndices: { index: number; field: keyof Place }[] = [];
  for (let i = 0; i < headers.length; i++) {
    const field = HEADER_MAP[headers[i].trim()];
    if (field) {
      fieldIndices.push({ index: i, field });
    }
  }

  // Parse data rows
  const places: Place[] = [];
  const usedSlugs = new Set<string>();

  for (let rowIdx = 1; rowIdx < rows.length; rowIdx++) {
    const values = rows[rowIdx];

    // Build the Place object with empty defaults
    const place: Place = {
      timestamp: "",
      nameAr: "",
      nameEn: "",
      descriptionAr: "",
      descriptionEn: "",
      addressAr: "",
      addressEn: "",
      governorate: "",
      area: "",
      mapLocation: "",
      placeType: "",
      price: "",
      priceUnit: "",
      suitableAge: "",
      placeNature: "",
      websiteLink: "",
      workingHours: "",
      familyFriendly: "",
      kidsFriendly: "",
      parking: "",
      reservationNeeded: "",
      socialMediaLinks: "",
      phoneNumber: "",
      placePhotos: "",
      menuPhotos: "",
      notes: "",
      slug: "",
    };

    for (const { index, field } of fieldIndices) {
      if (index < values.length) {
        place[field] = values[index];
      }
    }

    // Skip rows with no name
    if (!place.nameAr && !place.nameEn) {
      continue;
    }

    // Generate unique slug from the English name
    let slug = generateSlug(place.nameEn) || `place-${rowIdx}`;
    while (usedSlugs.has(slug)) {
      slug = `${slug}-${rowIdx}`;
    }
    usedSlugs.add(slug);
    place.slug = slug;

    places.push(place);
  }

  cachedPlaces = places;
  return places;
}

/**
 * Find a single place by its slug.
 */
export function getPlaceBySlug(slug: string): Place | undefined {
  return getAllPlaces().find((place) => place.slug === slug);
}

/**
 * Get all unique governorates from the data.
 */
export function getUniqueGovernorates(): string[] {
  const governorates = new Set(
    getAllPlaces()
      .map((place) => place.governorate)
      .filter(Boolean)
  );
  return Array.from(governorates);
}

/**
 * Get all unique place types from the data.
 */
export function getUniquePlaceTypes(): string[] {
  const types = new Set(
    getAllPlaces()
      .map((place) => place.placeType)
      .filter(Boolean)
  );
  return Array.from(types);
}
