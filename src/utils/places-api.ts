import { GeoLocation, PlaceDetailsResult, SearchOptions, SearchPreferences } from "./types";

export async function sendSearchRequest(
  searchQuery: string,
  geoLocation?: GeoLocation,
  searchPreferences?: SearchPreferences
) {
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
            latitude: geoLocation.latitude,
            longitude: geoLocation.longitude,
          },
          radius: searchPreferences?.searchRadius || 500.0,
        },
      },
    };
  }

  if (searchPreferences?.openNow)
    searchOptions = { ...searchOptions, openNow: searchPreferences.openNow };

  if (searchPreferences?.minRating)
    searchOptions = { ...searchOptions, minRating: searchPreferences.minRating };

  if (searchPreferences?.priceLevels)
    searchOptions = { ...searchOptions, priceLevels: searchPreferences.priceLevels };

  const response = await fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify(searchOptions),
  });

  const responseData = await response.json();
  return responseData.places;
}

export async function fetchPlaceDetails(placeId: string): Promise<PlaceDetailsResult> {
  const endpoint = "https://places.googleapis.com/v1/places/" + placeId;

  const headers = {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": import.meta.env.VITE_PLACES_API_KEY,
    "X-Goog-FieldMask": "photos,googleMapsUri,websiteUri,currentOpeningHours,userRatingCount",
  };

  const response = await fetch(endpoint, {
    method: "GET",
    headers,
  });

  const responseData = await response.json();
  return responseData;
}
