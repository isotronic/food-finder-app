import { GoogleMap, useLoadScript, Marker, InfoWindow } from "@react-google-maps/api";
import { Container, Typography } from "@mui/material";
import { GoogleMapDisplayProps, SearchResult } from "../utils/types";
import { useEffect, useState } from "react";
import { SingleResultDisplay } from "./SingleResultDisplay";

export default function GoogleMapDisplay({
  latitude,
  longitude,
  searchResult,
}: GoogleMapDisplayProps) {
  const [infoWindowOpen, setInfoWindowOpen] = useState(false);
  const [infoWindowData, setInfoWindowData] = useState<SearchResult>();
  const [mapReference, setMapReference] = useState<google.maps.Map>();
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: import.meta.env.VITE_PLACES_API_KEY,
  });
  const center = { lat: latitude, lng: longitude };

  useEffect(() => {
    if (searchResult) {
      const bounds = new google.maps.LatLngBounds();
      searchResult.map((result) => {
        bounds.extend({ lat: result.location.latitude, lng: result.location.longitude });
      });
      mapReference?.fitBounds(bounds);
    }
  }, [mapReference, searchResult]);

  function mapMarkerClickHandler(result: SearchResult) {
    if (infoWindowOpen) {
      setInfoWindowOpen(false);

      setTimeout(() => {
        mapReference?.panTo({ lat: result.location.latitude, lng: result.location.longitude });

        setInfoWindowOpen(true);
        setInfoWindowData(result);
      }, 0);
    } else {
      mapReference?.panTo({ lat: result.location.latitude, lng: result.location.longitude });

      setInfoWindowOpen(true);
      setInfoWindowData(result);
    }
  }

  return (
    <Container maxWidth="md" sx={{ padding: "0 !important" }}>
      {isLoaded ? (
        <GoogleMap
          mapContainerClassName="map-container"
          center={center}
          zoom={13}
          onLoad={setMapReference}
          onClick={() => setInfoWindowOpen(false)}
        >
          {searchResult?.map((result: SearchResult) => {
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
                    <SingleResultDisplay result={result} />
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
