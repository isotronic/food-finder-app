import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { geoLocationFinder } from "../utils/user-location";

import React, { useState } from "react";
import { GeoLocation, SearchResult } from "../utils/types";
import { sendSearchRequest } from "../utils/http";
import GoogleMapDisplay from "../components/Map";
import { Form } from "react-router-dom";

export default function Search() {
  const [geoLocation, setGeoLocation] = useState<GeoLocation>({
    latitude: 51.5072,
    longitude: -0.13,
  });
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState<SearchResult[]>();

  function changeSearchQueryHandler(
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    setSearchQuery(event.target.value);
  }

  function geoLocationFinderHandler() {
    const userLocation = geoLocationFinder();

    if (typeof userLocation === "object") setGeoLocation(userLocation);
    if (typeof userLocation === "string") console.log(userLocation);
  }

  async function searchRequestHandler() {
    const result = await sendSearchRequest(searchQuery, geoLocation);
    setSearchResult(result);
  }
  return (
    <Container maxWidth="md">
      <Box sx={{ my: 4 }}>
        <Form onSubmit={searchRequestHandler}>
          <Typography variant="h5" align="center" sx={{ my: 2 }}>
            What are you craving today?
          </Typography>
          <TextField
            fullWidth
            id="foodSearch"
            label="Search"
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
      <GoogleMapDisplay
        latitude={geoLocation.latitude}
        longitude={geoLocation.longitude}
        searchResult={searchResult}
      />
    </Container>
  );
}
