import { firebaseApp } from "./firebase-setup";
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { AuthenticationFormValues } from "./types";

export const firebaseAuth = getAuth(firebaseApp);

setPersistence(firebaseAuth, browserLocalPersistence);

export async function createUser({ email, password }: AuthenticationFormValues) {
  const result = await createUserWithEmailAndPassword(firebaseAuth, email, password);
  return result;
}

export async function loginUser({ email, password }: AuthenticationFormValues) {
  const result = await signInWithEmailAndPassword(firebaseAuth, email, password);
  return result;
}

export async function logoutUser() {
  const result = await signOut(firebaseAuth);
  return result;
}

export async function updateDisplayName(displayName: string) {
  const result = await updateProfile(firebaseAuth.currentUser!, { displayName });
  return result;
}
