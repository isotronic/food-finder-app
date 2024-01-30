import { User } from "firebase/auth";

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

export interface SearchFormProps {
  geoLocation: GeoLocation;
  setGeoLocation: React.Dispatch<React.SetStateAction<GeoLocation>>;
  setErrorMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
  setSearchResult: React.Dispatch<React.SetStateAction<SearchResult[] | undefined>>;
}

export interface AuthContextProps {
  user: User | null;
}

export interface AuthenticationFormValues {
  email: string;
  password: string;
}
