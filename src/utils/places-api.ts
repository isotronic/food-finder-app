import { GeoLocation, SearchOptions } from "./types";

export async function sendSearchRequest(searchQuery: string, geoLocation?: GeoLocation) {
  const endpoint = "https://places.googleapis.com/v1/places:searchText";

  const headers = {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": import.meta.env.VITE_PLACES_API_KEY,
    "X-Goog-FieldMask":
      "places.formattedAddress,places.displayName.text,places.location,places.rating,places.id,places.types",
  };

  let searchOptions: SearchOptions = {
    textQuery: searchQuery,
    maxResultCount: 10,
  };

  if (geoLocation) {
    searchOptions = {
      ...searchOptions,
      locationBias: {
        circle: {
          center: {
            latitude: geoLocation?.latitude,
            longitude: geoLocation?.longitude,
          },
          radius: 1000.0,
        },
      },
    };
  }

  const response = await fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify(searchOptions),
  });

  const responseData = await response.json();
  return responseData.places;
}
