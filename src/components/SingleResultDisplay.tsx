import { Box, Button, CircularProgress, Rating, Typography } from "@mui/material";
import { PlaceDetailsResult, SingleResultDisplayProps } from "../utils/types";
import { forwardRef, useEffect, useState } from "react";
import { fetchPlaceDetails } from "../utils/places-api";
import { Link as RouterLink } from "react-router-dom";

export const SingleResultDisplay = forwardRef<HTMLDivElement, SingleResultDisplayProps>(
  ({ result }, ref) => {
    const [placeDetails, setPlaceDetails] = useState<PlaceDetailsResult>();
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
      async function fetchPlaceDetailsHandler() {
        setIsLoading(true);

        const response = await fetchPlaceDetails(result.id);
        setPlaceDetails(response);

        setIsLoading(false);
      }

      fetchPlaceDetailsHandler();
    }, [result.id]);

    return (
      <Box ref={ref}>
        {isLoading ? (
          <CircularProgress color="inherit" />
        ) : (
          <>
            <Typography gutterBottom variant="h5">
              {result.displayName.text}
            </Typography>
            <Typography gutterBottom>{result.formattedAddress}</Typography>
            <Box display="flex">
              <Rating value={result.rating} precision={0.1} readOnly />
              <Typography>{placeDetails?.userRatingCount} Reviews</Typography>
            </Box>
            <Box sx={{ my: 1 }}>
              <Button component={RouterLink} to={placeDetails!.googleMapsUri}>
                Google Maps Page
              </Button>
              <Button component={RouterLink} to={placeDetails!.websiteUri}>
                Website
              </Button>
            </Box>
          </>
        )}
      </Box>
    );
  }
);
