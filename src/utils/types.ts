export interface GeoLocation {
  latitude: number;
  longitude: number;
}

export interface SearchOptions {
  textQuery: string;
  maxResultCount: number;
  locationBias?: object;
}

export interface SearchResult {
  displayName: { text: string };
  formattedAddress: string;
  id: string;
  location: GeoLocation;
  rating: number;
  types: string[];
}

export interface GoogleMapDisplayProps {
  latitude: number;
  longitude: number;
  searchResult?: SearchResult[];
}
