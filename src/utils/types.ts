export type GeoLocation = {
  latitude: number;
  longitude: number;
};

export type SearchOptions = {
  textQuery: string;
  maxResultCount: number;
  locationBias?: object;
};
