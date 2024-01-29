import { useState, useEffect } from "react";
import { firebaseAuth } from "../utils/firebase";
import { AuthContext } from "./AuthContext";
import { User, onAuthStateChanged } from "firebase/auth";

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user);
    });
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}
