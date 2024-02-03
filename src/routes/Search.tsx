import { useContext, useEffect, useState } from "react";

import { Alert, Box, Container } from "@mui/material";

import { GeoLocation, SearchResult } from "../utils/types";

import GoogleMapDisplay from "../components/GoogleMapDisplay";
import SearchForm from "../components/SearchForm";
import { AuthContext } from "../context/AuthProvider";
import { saveSearchResult } from "../utils/firebase/firestore";
import { getErrorMessage } from "../utils/error-handler";

export default function Search() {
  const { user } = useContext(AuthContext);
  const [geoLocation, setGeoLocation] = useState<GeoLocation>({
    latitude: 51.5072,
    longitude: -0.13,
  });
  const [errorMessage, setErrorMessage] = useState<string | undefined>();
  const [searchResult, setSearchResult] = useState<SearchResult[]>();

  useEffect(() => {
    if (user && searchResult) {
      try {
        saveSearchResult(user.uid, searchResult);
      } catch (error) {
        setErrorMessage(getErrorMessage(error));
      }
    }
  }, [searchResult, user]);

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
