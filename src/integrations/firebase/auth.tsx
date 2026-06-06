import { createContext, useContext, useEffect, useState, type ReactNode } from "react";
import { onAuthStateChanged, signInWithPopup, signOut, type User } from "firebase/auth";
import { getFirebaseAuth, googleProvider, isFirebaseConfigured } from "./client";

interface AuthContextValue {
  user: User | null;
  loading: boolean;
  configured: boolean;
  signIn: () => Promise<void>;
  signOutUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | null>(null);

export function FirebaseAuthProvider({ children }: { children: ReactNode }) {
  const configured = isFirebaseConfigured();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(configured);

  useEffect(() => {
    if (!configured) return;
    const auth = getFirebaseAuth();
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u);
      setLoading(false);
    });
    return () => unsub();
  }, [configured]);

  const signIn = async () => {
    if (!configured) throw new Error("Firebase n'est pas configuré.");
    await signInWithPopup(getFirebaseAuth(), googleProvider);
  };
  const signOutUser = async () => {
    if (!configured) return;
    await signOut(getFirebaseAuth());
  };

  return (
    <AuthContext.Provider value={{ user, loading, configured, signIn, signOutUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useFirebaseAuth(): AuthContextValue {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useFirebaseAuth doit être utilisé dans <FirebaseAuthProvider>");
  return ctx;
}
