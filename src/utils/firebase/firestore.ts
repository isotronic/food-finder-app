import { doc, getFirestore, setDoc } from "firebase/firestore";
import { firebaseApp } from "./setup";

const db = getFirestore(firebaseApp);

export async function addUser(userId: string) {
  const result = await setDoc(doc(db, "users", userId), {});
  return result;
}
