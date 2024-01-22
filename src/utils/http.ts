import { GeoLocation } from "./types";

export async function sendSearchRequest(searchQuery: string, geoLocation?: GeoLocation) {
  const endpoint = "https://places.googleapis.com/v1/places:searchText";

  const headers = {
    "Content-Type": "application/json",
    "X-Goog-Api-Key": import.meta.env.VITE_PLACES_API_KEY,
    "X-Goog-FieldMask": "*",
  };

  // let locationRestriction;

  // if (geoLocation) {
  //   locationRestriction = {
  //     locationRestriction: {
  //       circle: {
  //         center: {
  //           latitude: geoLocation?.latitude,
  //           longitude: geoLocation?.longitude,
  //         },
  //         radius: 500.0,
  //       },
  //     },
  //   };
  // }

  const searchOptions = {
    textQuery: searchQuery,
    maxResultCount: 10,
    locationRestriction: {
      circle: {
        center: {
          latitude: geoLocation?.latitude,
          longitude: geoLocation?.longitude,
        },
        radius: 500.0,
      },
    },
  };

  const response = await fetch(endpoint, {
    method: "POST",
    headers,
    body: JSON.stringify(searchOptions),
  });

  const responseData = await response.json();
  console.log(responseData);
}
