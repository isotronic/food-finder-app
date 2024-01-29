import { useState } from "react";
import { Form } from "react-router-dom";

import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { sendSearchRequest } from "../utils/places-api";
import { geoLocationFinder } from "../utils/user-location";
import { SearchFormProps } from "../utils/types";

export default function SearchForm({
  geoLocation,
  setGeoLocation,
  setErrorMessage,
  setSearchResult,
}: SearchFormProps) {
  const [searchQuery, setSearchQuery] = useState("");

  function changeSearchQueryHandler(
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    setSearchQuery(event.target.value);
  }

  async function geoLocationFinderHandler() {
    geoLocationFinder(setGeoLocation, setErrorMessage);
    // try {
    //   const userLocation = await geoLocationFinder();
    //   if (userLocation.latitude && userLocation.longitude) setGeoLocation(userLocation);
    // } catch (error) {
    //   setErrorMessage(getErrorMessage(error));
    // }
  }

  async function searchRequestHandler() {
    const result = await sendSearchRequest(searchQuery, geoLocation);
    setSearchResult(result);
  }

  return (
    <Box sx={{ my: 4 }}>
      <Form onSubmit={searchRequestHandler}>
        <Typography variant="h5" align="center" sx={{ my: 2 }}>
          What are you craving today?
        </Typography>
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
      </Form>
    </Box>
  );
}
