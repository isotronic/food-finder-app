import {
  addDoc,
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import { firebaseApp } from "./setup";
import { GeoLocation, SearchHistoryData, SearchResult } from "../types";

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

export async function saveSearchResult(
  userId: string,
  searchQuery: string,
  searchResult: SearchResult[]
) {
  await addDoc(collection(db, "users", userId, "searchHistory"), {
    date: serverTimestamp(),
    searchQuery,
    searchResult,
  });
}

export async function fetchSearchHistory(userId: string): Promise<SearchHistoryData[]> {
  const snapshot = await getDocs(collection(db, "users", userId, "searchHistory"));

  if (!snapshot.empty) {
    return snapshot.docs.map((row) => {
      const data = row.data();
      return {
        id: row.id,
        date: data.date.toDate(),
        searchQuery: data.searchQuery,
        searchResult: data.searchResult,
      };
    });
  } else {
    return [];
  }
}
