import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { Container, Typography } from "@mui/material";
import { SearchResult } from "../utils/types";
import { useState } from "react";

export default function GoogleMapDisplay(props: {
  latitude: number;
  longitude: number;
  searchResult: SearchResult[] | undefined;
}) {
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState<SearchResult>();
  const [mapReference, setMapReference] = useState<google.maps.Map>();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_PLACES_API_KEY,
  });
  const center = { lat: props.latitude, lng: props.longitude };

  function onMapLoad(map: google.maps.Map) {
    if (props.searchResult) {
      const bounds = new google.maps.LatLngBounds();

      props.searchResult.map((result) => {
        bounds.extend({ lat: result.location.latitude, lng: result.location.longitude });
      });
      map.fitBounds(bounds);
    }

    setMapReference(map);
  }

  function mapMarkerClickHandler(result: SearchResult) {
    mapReference?.panTo({ lat: result.location.latitude, lng: result.location.longitude });
    setInfoWindowOpen(true);
    setInfoWindowData(result);
  }

  return (
    <Container maxWidth="md" sx={{ padding: "0 !important" }}>
      {isLoaded ? (
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={13}
          onLoad={onMapLoad}
          onClick={() => setInfoWindowOpen(false)}
        >
          {props.searchResult &&
            props.searchResult.map((result: SearchResult) => {
              return (
                <Marker
                  key={result.id}
                  position={{ lat: result.location.latitude, lng: result.location.longitude }}
                  onClick={() => {
                    mapMarkerClickHandler(result);
                  }}
                >
                  {infoWindowOpen && infoWindowData?.id === result.id && (
                    <InfoWindow
                      onCloseClick={() => {
                        setInfoWindowOpen(false);
                      }}
                    >
                      <h3>{result.displayName.text}</h3>
                    </InfoWindow>
                  )}
                </Marker>
              );
            })}
        </GoogleMap>
      ) : (
        <Typography variant="body1" align="center">
          Loading...
        </Typography>
      )}
    </Container>
  );
}
