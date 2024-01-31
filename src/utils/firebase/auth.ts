import { firebaseApp } from "./setup";
import {
  browserLocalPersistence,
  createUserWithEmailAndPassword,
  getAuth,
  setPersistence,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { AuthenticationFormValues } from "../types";
import { addUser } from "./firestore";
import { getErrorMessage } from "../error-handler";

export const firebaseAuth = getAuth(firebaseApp);

setPersistence(firebaseAuth, browserLocalPersistence);

export async function createUser({ displayName, email, password }: AuthenticationFormValues) {
  const result = await createUserWithEmailAndPassword(firebaseAuth, email, password);
  if (displayName!.length > 0) {
    try {
      await updateDisplayName(displayName!);
    } catch (error) {
      console.log(getErrorMessage(error));
    }
  }
  const userId = result.user.uid;

  try {
    await addUser(userId);
  } catch (error) {
    console.log(getErrorMessage(error));
  }
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
