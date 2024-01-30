import { useState } from "react";

import { Alert, Box, Container } from "@mui/material";

import { GeoLocation, SearchResult } from "../utils/types";

import GoogleMapDisplay from "../components/GoogleMapDisplay";
import SearchForm from "../components/SearchForm";

export default function Search() {
  const [geoLocation, setGeoLocation] = useState<GeoLocation>({
    latitude: 51.5072,
    longitude: -0.13,
  });
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [searchResult, setSearchResult] = useState<SearchResult[]>();

  return (
    <Container maxWidth="md">
      {errorMessage && (
        <Box sx={{ my: 4 }}>
          <Alert severity="error">{errorMessage}</Alert>
        </Box>
      )}
      <SearchForm
        geoLocation={geoLocation}
        setGeoLocation={setGeoLocation}
        setErrorMessage={setErrorMessage}
        setSearchResult={setSearchResult}
      />
      <GoogleMapDisplay
        latitude={geoLocation.latitude}
        longitude={geoLocation.longitude}
        searchResult={searchResult}
      />
    </Container>
  );
}
