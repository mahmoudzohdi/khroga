import { notFound } from "next/navigation";
import type { Metadata } from "next";
import { getAllPlaces, getPlaceBySlug } from "@/lib/csv-parser";
import PlaceDetail from "@/components/place-detail";

interface PlacePageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams(): { slug: string }[] {
  return getAllPlaces().map((place) => ({ slug: place.slug }));
}

export async function generateMetadata({
  params,
}: PlacePageProps): Promise<Metadata> {
  const { slug } = await params;
  const place = getPlaceBySlug(slug);

  if (!place) {
    return { title: "Place Not Found" };
  }

  return {
    title: `${place.nameEn} | ${place.nameAr} - Khroga`,
    description: place.descriptionEn || place.descriptionAr || "",
  };
}

export default async function PlacePage({ params }: PlacePageProps) {
  const { slug } = await params;
  const place = getPlaceBySlug(slug);

  if (!place) {
    notFound();
  }

  return <PlaceDetail place={place} />;
}
