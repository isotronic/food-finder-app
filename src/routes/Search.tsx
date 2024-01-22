import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { Button } from "@mui/material";
import { geoLocationFinder } from "../utils/user-location";

import React, { useState } from "react";
import { GeoLocation } from "../utils/types";
import { sendSearchRequest } from "../utils/http";

export default function Search() {
  const [geoLocation, setGeoLocation] = useState<GeoLocation>({ latitude: 0, longitude: 0 });
  const [searchQuery, setSearchQuery] = useState("");

  function changeSearchQueryHandler(
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) {
    setSearchQuery(event.target.value);
  }

  function geoLocationFinderHandler() {
    setGeoLocation(geoLocationFinder());
  }

  function searchRequestHandler() {
    sendSearchRequest(searchQuery, geoLocation);
  }
  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 4 }}>
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
          <Button variant="contained" onClick={searchRequestHandler}>
            Search
          </Button>
        </Box>
      </Box>
    </Container>
  );
}
