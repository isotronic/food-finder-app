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
  priceLevels?: string[];
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
  geoLocation: GeoLocation | undefined;
  searchQuery: string;
  setGeoLocation: React.Dispatch<React.SetStateAction<GeoLocation | undefined>>;
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
  minRating?: number | null;
  priceLevels?: string[];
  openNow?: boolean;
}

export interface SetSearchPreferences {
  userId: string;
  noSetFunctions?: boolean;
  setSearchRadius?: React.Dispatch<React.SetStateAction<number>>;
  setMinRating?: React.Dispatch<React.SetStateAction<number | null>>;
  setPriceLevels?: React.Dispatch<React.SetStateAction<string[]>>;
  setOpenNow?: React.Dispatch<React.SetStateAction<boolean | undefined>>;
}

export interface SearchHistoryData {
  id: string;
  date: Date;
  searchQuery: string;
  searchResult: SearchResult[];
}

export interface HeaderSEOProps {
  title: string;
  description: string;
  type?: string;
}
