import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { Container, Typography } from "@mui/material";
import { GeoLocation } from "../utils/types";

export default function GoogleMapDisplay(geoLocation: GeoLocation) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_PLACES_API_KEY,
  });
  const center = { lat: geoLocation.latitude, lng: geoLocation.longitude };

  return (
    <Container maxWidth="md" sx={{ padding: "0 !important" }}>
      {isLoaded ? (
        <GoogleMap mapContainerClassName="map-container" center={center} zoom={12}></GoogleMap>
      ) : (
        <Typography variant="body1" align="center">
          Loading...
        </Typography>
      )}
    </Container>
  );
}
