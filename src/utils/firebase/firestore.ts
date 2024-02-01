import { doc, getDoc, getFirestore, setDoc, updateDoc } from "firebase/firestore";
import { firebaseApp } from "./setup";
import { GeoLocation } from "../types";

const db = getFirestore(firebaseApp);

export async function addUser(userId: string) {
  await setDoc(doc(db, "users", userId), {});
}

export async function saveLocationPreference(userId: string, geoLocation: GeoLocation) {
  await updateDoc(doc(db, "users", userId), {
    geoLocation,
  });
}

export async function fetchLocationPreference(
  userId: string,
  setGeoLocation: React.Dispatch<React.SetStateAction<GeoLocation | undefined>>
) {
  const snapshot = await getDoc(doc(db, "users", userId));

  if (snapshot.exists()) setGeoLocation(snapshot.data().geoLocation);
}
