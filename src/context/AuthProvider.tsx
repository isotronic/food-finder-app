import { useState, useEffect, createContext } from "react";
import { firebaseAuth } from "../utils/firebase-auth";
import { User, onAuthStateChanged } from "firebase/auth";
import { AuthContextProps } from "../utils/types";

export const AuthContext = createContext({} as AuthContextProps);

export default function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(firebaseAuth, (user) => {
      setUser(user);
    });
  }, []);

  return <AuthContext.Provider value={{ user }}>{children}</AuthContext.Provider>;
}
