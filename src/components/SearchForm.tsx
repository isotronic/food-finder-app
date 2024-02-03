import { FormEvent, useContext } from "react";

import { Box, Button, TextField, Typography } from "@mui/material";

import { sendSearchRequest } from "../utils/places-api";
import { geoLocationFinder } from "../utils/user-location";
import { SearchFormProps } from "../utils/types";
import { AuthContext } from "../context/AuthProvider";
import { getErrorMessage } from "../utils/error-handler";

export default function SearchForm({
  geoLocation,
  searchQuery,
  setGeoLocation,
  setSearchQuery,
  setErrorMessage,
  setSearchResult,
}: SearchFormProps) {
  const { user } = useContext(AuthContext);

  function changeSearchQueryHandler(
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    setSearchQuery(event.target.value);
  }

  async function geoLocationFinderHandler() {
    // geoLocationFinder(setGeoLocation, setErrorMessage);
    try {
      const userLocation = await geoLocationFinder();
      if (userLocation.latitude && userLocation.longitude) setGeoLocation(userLocation);
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  }

  async function searchRequestHandler(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const result = await sendSearchRequest(searchQuery, geoLocation);
    setSearchResult(result);
  }

  return (
    <Box sx={{ my: 6 }}>
      <Typography variant="h5" align="center" sx={{ my: 4 }}>
        What are you craving today{user && user.displayName !== null && ", " + user.displayName}?
      </Typography>
      <form onSubmit={searchRequestHandler}>
        <TextField
          fullWidth
          id="foodSearch"
          label="Search"
          type="search"
          onChange={changeSearchQueryHandler}
          sx={{ my: 2 }}
        />

        <Box display="flex" justifyContent="flex-end">
          <Button
            // disabled={JSON.stringify(geoLocation) !== JSON.stringify({ latitude: 0, longitude: 0 })}
            onClick={geoLocationFinderHandler}
            variant="outlined"
            sx={{ mx: 1 }}
          >
            Use My Location
          </Button>
          <Button variant="contained" type="submit">
            Search
          </Button>
        </Box>
      </form>
    </Box>
  );
}
