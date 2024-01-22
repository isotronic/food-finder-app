import { GeoLocation } from "./types";
import { errorHandler, getErrorMessage } from "../utils/error-handler";

export function geoLocationFinder() {
  const geoLocation: GeoLocation = { latitude: 0, longitude: 0 };

  function successCallback(position: GeolocationPosition) {
    geoLocation.latitude = position.coords.latitude;
    geoLocation.longitude = position.coords.longitude;
  }
  function errorCallback(error: GeolocationPositionError) {
    throw new Error(error.message);
    // console.warn(`ERROR(${error.code}): ${error.message}`);
  }

  try {
    navigator.geolocation.getCurrentPosition(successCallback, errorCallback);
  } catch (error) {
    errorHandler({ message: getErrorMessage(error) });
  }

  return geoLocation;
}