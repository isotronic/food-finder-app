// import { getErrorMessage } from "./error-handler";
import { GeoLocation } from "./types";

// export function geoLocationFinder(
//   setGeoLocation: React.Dispatch<React.SetStateAction<GeoLocation>>,
//   setErrorMessage: React.Dispatch<React.SetStateAction<string | undefined>>
// ) {
//   navigator.geolocation.getCurrentPosition(
//     (position) => {
//       setGeoLocation({ latitude: position.coords.latitude, longitude: position.coords.longitude });
//     },
//     (error) => {
//       setErrorMessage(getErrorMessage(error));
//     }
//   );
// }

export async function geoLocationFinder() {
  return new Promise<GeolocationPosition>((resolve, reject) =>
    navigator.geolocation.getCurrentPosition(resolve, reject)
  ).then(
    (position): GeoLocation => ({
      latitude: position.coords.latitude,
      longitude: position.coords.longitude,
    })
  );
}
