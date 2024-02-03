import { User } from "firebase/auth";

export interface GeoLocation {
  latitude: number;
  longitude: number;
}

export interface SearchOptions {
  textQuery: string;
  maxResultCount: number;
  locationBias?: object;
  minRating?: number;
  priceLevels?: string;
  openNow?: boolean;
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

export interface SearchFormProps {
  geoLocation: GeoLocation;
  searchQuery: string;
  setGeoLocation: React.Dispatch<React.SetStateAction<GeoLocation>>;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSearchResult: React.Dispatch<React.SetStateAction<SearchResult[] | undefined>>;
}

export interface AuthContextProps {
  user: User | null;
}

export interface AuthenticationFormValues {
  displayName?: string;
  email: string;
  password: string;
}

export interface SearchPreferences {
  searchRadius?: number;
  minRating?: number;
  priceLevel?: string[];
  openNow?: boolean;
}

export interface SearchHistoryData {
  id: string;
  date: Date;
  searchQuery: string;
  searchResult: SearchResult[];
}
