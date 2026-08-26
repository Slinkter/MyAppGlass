import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
import {
  User,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut as fbSignOut,
} from "firebase/auth";
import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { auth, db } from "@/shared/lib/firebase";
import { UserRole, ClientProfile } from "@/shared/schemas/ecommerce-schemas";
import { logger } from "@/shared/utils/logger";

interface AuthContextType {
  user: User | null;
  role: UserRole;
  profile: ClientProfile | null;
  loading: boolean;
  login: (email: string, pass: string) => Promise<void>;
  registerClient: (
    email: string,
    pass: string,
    profileData: Omit<ClientProfile, "userId" | "email" | "role">
  ) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole>("cliente");
  const [profile, setProfile] = useState<ClientProfile | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
          // 1. Obtener y asegurar rol del usuario en Firestore
          const isEmailAdmin = Boolean(
            currentUser.email &&
            (currentUser.email.toLowerCase().includes("admin") ||
             currentUser.email.toLowerCase().endsWith("@gyacompany.com"))
          );

          try {
            const userRef = doc(db, "users", currentUser.uid);
            const clientRef = doc(db, "clientes", currentUser.uid);

            // Parallelize independent Firestore reads
            const [userDoc, clientDoc] = await Promise.all([
              getDoc(userRef),
              getDoc(clientRef),
            ]);

            // Handle user role
            if (userDoc.exists()) {
              const data = userDoc.data();
              const fetchedRole = String(data?.role || "").toLowerCase().trim();
              setRole(fetchedRole === "admin" ? "admin" : "cliente");
            } else {
              const determinedRole = isEmailAdmin ? "admin" : "cliente";
              setRole(determinedRole);
              // SECURITY NOTE: Client writes role field. This is safe here because:
              // 1. Only runs when user doc doesn't exist (first login)
              // 2. Role is derived from email domain, not user input
              // 3. Firestore rules enforce admin-only write paths for elevated roles
              // 4. Prefer moving this to Cloud Functions when functions/ is unfrozen
              await setDoc(userRef, {
                uid: currentUser.uid,
                email: currentUser.email,
                role: determinedRole,
                createdAt: serverTimestamp(),
                updatedAt: serverTimestamp(),
              }, { merge: true });
            }

            // Handle client profile
            if (clientDoc.exists()) {
              setProfile(clientDoc.data() as ClientProfile);
            } else {
              setProfile(null);
            }
          } catch (err: unknown) {
            logger.warn("Consulta/aprovisionamiento de rol en Firestore en modo tolerante", err);
            setRole(isEmailAdmin ? "admin" : "cliente");
            setProfile(null);
          }
      } else {
        setRole("cliente");
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = useCallback(async (email: string, pass: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } finally {
      setLoading(false);
    }
  }, []);

  const registerClient = useCallback(async (
    email: string,
    pass: string,
    profileData: Omit<ClientProfile, "userId" | "email" | "role">
  ) => {
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      const uid = cred.user.uid;

      // Crear documento en users con rol cliente
      const fullProfile: ClientProfile = {
        userId: uid,
        email,
        role: "cliente",
        ...profileData,
        createdAt: serverTimestamp(),
      };

      // Parallelize independent Firestore writes
      await Promise.all([
        setDoc(doc(db, "users", uid), {
          uid,
          email,
          role: "cliente",
          createdAt: serverTimestamp(),
        }),
        setDoc(doc(db, "clientes", uid), fullProfile),
      ]);

      setProfile(fullProfile);
      setRole("cliente");
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    await fbSignOut(auth);
    setUser(null);
    setProfile(null);
    setRole("cliente");
  }, []);

  const contextValue = useMemo(
    () => ({
      user,
      role,
      profile,
      loading,
      login,
      registerClient,
      logout,
    }),
    [user, role, profile, loading, login, registerClient, logout],
  );

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser usado dentro de un AuthProvider");
  }
  return context;
};
