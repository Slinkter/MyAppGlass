import React, { createContext, useContext, useEffect, useState, useMemo, useCallback } from "react";
import type { User } from "firebase/auth";
import type { UserRole, ClientProfile } from "@/shared/schemas/ecommerce-schemas";
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
    let unsubscribe: (() => void) | undefined;
    let cancelled = false;

    const initAuth = async () => {
      const [{ onAuthStateChanged }, { auth }] = await Promise.all([
        import("firebase/auth"),
        import("@/shared/lib/firebase"),
      ]);
      if (cancelled) return;

      unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
        setUser(currentUser);
        if (currentUser) {
            const isEmailAdmin = false;

            try {
              const [
                { getUserRoleDoc, provisionUserDoc },
                { getClientProfile },
              ] = await Promise.all([
                import("@/shared/api/firebase/usersRepository"),
                import("@/shared/api/firebase/clientsRepository"),
              ]);

              const [fetchedRoleRaw, clientProfile] = await Promise.all([
                getUserRoleDoc(currentUser.uid),
                getClientProfile(currentUser.uid),
              ]);

              if (fetchedRoleRaw !== null) {
                setRole(fetchedRoleRaw === "admin" ? "admin" : "cliente");
              } else {
                const determinedRole: UserRole = "cliente";
                setRole(determinedRole);
                await provisionUserDoc(currentUser.uid, currentUser.email, determinedRole);
              }

              setProfile(clientProfile);
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
    };

    const timer = window.setTimeout(() => {
      void initAuth();
    }, 300);

    return () => {
      cancelled = true;
      window.clearTimeout(timer);
      if (unsubscribe) unsubscribe();
    };
  }, []);

  const login = useCallback(async (email: string, pass: string) => {
    setLoading(true);
    try {
      const [{ signInWithEmailAndPassword }, { auth }] = await Promise.all([
        import("firebase/auth"),
        import("@/shared/lib/firebase"),
      ]);
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
      const [
        { createUserWithEmailAndPassword },
        { auth },
        { serverTimestamp },
        { createClientUserDoc },
        { setClientProfile },
      ] = await Promise.all([
        import("firebase/auth"),
        import("@/shared/lib/firebase"),
        import("firebase/firestore"),
        import("@/shared/api/firebase/usersRepository"),
        import("@/shared/api/firebase/clientsRepository"),
      ]);
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      const uid = cred.user.uid;

      const fullProfile: ClientProfile = {
        userId: uid,
        email,
        role: "cliente",
        ...profileData,
        createdAt: serverTimestamp(),
      };

      await Promise.all([
        createClientUserDoc(uid, email),
        setClientProfile(uid, fullProfile),
      ]);

      setProfile(fullProfile);
      setRole("cliente");
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(async () => {
    const [{ signOut: fbSignOut }, { auth }] = await Promise.all([
      import("firebase/auth"),
      import("@/shared/lib/firebase"),
    ]);
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
