import { useEffect, useState } from "react";
import { Box, Button, Typography } from "@mui/material";
import { GeoLocation } from "../utils/types";
import { geoLocationFinder } from "../utils/user-location";
import { fetchLocationPreference, saveLocationPreference } from "../utils/firebase/firestore";
import { firebaseAuth } from "../utils/firebase/auth";
import { getErrorMessage } from "../utils/error-handler";

export default function UserLocationPreference({
  setErrorMessage,
}: {
  setErrorMessage: React.Dispatch<React.SetStateAction<string | undefined>>;
}) {
  const [geoLocation, setGeoLocation] = useState<GeoLocation>();
  const user = firebaseAuth.currentUser;

  useEffect(() => {
    const unsubscribe = firebaseAuth.onAuthStateChanged(async (user) => {
      if (user) {
        try {
          await fetchLocationPreference(user.uid, setGeoLocation);
        } catch (error) {
          setErrorMessage(getErrorMessage(error));
        }
      } else {
        setGeoLocation(undefined);
      }
    });

    return () => unsubscribe();
  }, [setErrorMessage]);

  async function saveLocationHandler() {
    try {
      const userLocation = await geoLocationFinder();
      if (userLocation.latitude && userLocation.longitude) {
        setGeoLocation(userLocation);

        if (user) {
          try {
            await saveLocationPreference(user.uid, userLocation);
          } catch (error) {
            setErrorMessage(getErrorMessage(error));
          }
        }
      }
    } catch (error) {
      setErrorMessage(getErrorMessage(error));
    }
  }
  return (
    <Box sx={{ my: 4 }}>
      <Typography variant="h5" sx={{ my: 4 }}>
        Your location preference for searches
      </Typography>
      <Typography variant="body1" sx={{ my: 2 }}>
        You have the option to save your current location for future searches. If you're searching
        from a different location, don't worry, as you can always press the "use my location" button
        on the search page to fetch your current location for searches. Also, if you leave and
        return to the app, the search will automatically use the location you saved here, as long as
        you are logged in.
      </Typography>
      <Typography variant="body1" sx={{ my: 2 }}>
        Saved location coordinates:
        <br />
        {geoLocation
          ? `Latitude: ${geoLocation.latitude}, Longitude: ${geoLocation.longitude}`
          : "There are no saved coordinates."}
      </Typography>
      <Box display="flex" justifyContent="flex-end">
        <Button onClick={saveLocationHandler} variant="contained">
          Save My Location
        </Button>
      </Box>
    </Box>
  );
}
