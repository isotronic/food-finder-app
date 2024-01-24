export type GeoLocation = {
  latitude: number;
  longitude: number;
};

export type SearchOptions = {
  textQuery: string;
  maxResultCount: number;
  locationBias?: object;
};

export type SearchResult = {
  displayName: { text: string };
  formattedAddress: string;
  id: string;
  location: GeoLocation;
  rating: number;
  types: string[];
};
