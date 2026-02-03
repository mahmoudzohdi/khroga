import {
  getAllPlaces,
  getUniqueGovernorates,
  getUniquePlaceTypes,
} from "@/lib/csv-parser";
import PlacesListing from "@/components/places-listing";

export default function Home() {
  const places = getAllPlaces();
  const governorates = getUniqueGovernorates();
  const placeTypes = getUniquePlaceTypes();

  return (
    <PlacesListing
      places={places}
      governorates={governorates}
      placeTypes={placeTypes}
    />
  );
}
