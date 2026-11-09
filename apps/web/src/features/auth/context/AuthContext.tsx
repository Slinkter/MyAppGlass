"use client";

import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  useMemo,
  useCallback,
  useRef,
} from "react";
import type { User } from "firebase/auth";
import { usePathname } from "next/navigation";
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

const HAS_AUTH_SESSION_KEY = "gya_has_auth_session";

function hasLikelyAuthSession(): boolean {
  if (typeof window === "undefined") return false;
  try {
    if (window.localStorage.getItem(HAS_AUTH_SESSION_KEY) === "1") {
      return true;
    }
    for (let i = 0; i < window.localStorage.length; i++) {
      const key = window.localStorage.key(i);
      if (key && (key.startsWith("firebase:authUser:") || key.startsWith("firebase:host:"))) {
        return true;
      }
    }
  } catch {
    return false;
  }
  return false;
}

function isAuthRequiredRoute(pathname: string | null): boolean {
  if (!pathname) return false;
  return (
    pathname.startsWith("/admin") ||
    pathname.startsWith("/mi-cuenta") ||
    pathname.startsWith("/auth") ||
    pathname.startsWith("/tienda/checkout") ||
    pathname.startsWith("/checkout")
  );
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);
  const [role, setRole] = useState<UserRole>("cliente");
  const [profile, setProfile] = useState<ClientProfile | null>(null);

  // En rutas públicas y sin sesión previa, loading inicia en false para no demorar la UI
  const [loading, setLoading] = useState<boolean>(() => {
    return isAuthRequiredRoute(pathname) || hasLikelyAuthSession();
  });

  const authInitializedRef = useRef<boolean>(false);
  const unsubscribeRef = useRef<(() => void) | undefined>(undefined);

  const initAuth = useCallback(async () => {
    if (authInitializedRef.current) return;
    authInitializedRef.current = true;

    try {
      const [{ onAuthStateChanged }, { getFirebaseAuth }] = await Promise.all([
        import("firebase/auth"),
        import("@/shared/lib/firebase"),
      ]);
      const auth = await getFirebaseAuth();

      unsubscribeRef.current = onAuthStateChanged(auth, async (currentUser) => {
        setUser(currentUser);
        if (currentUser) {
          try {
            window.localStorage.setItem(HAS_AUTH_SESSION_KEY, "1");
          } catch {
            // ignore
          }
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
          try {
            window.localStorage.removeItem(HAS_AUTH_SESSION_KEY);
          } catch {
            // ignore
          }
          setRole("cliente");
          setProfile(null);
        }
        setLoading(false);
      });
    } catch (err) {
      logger.error("Error al inicializar Firebase Auth", err);
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    const shouldInit = isAuthRequiredRoute(pathname) || hasLikelyAuthSession();
    if (shouldInit) {
      void initAuth();
    } else {
      setLoading(false);
    }
  }, [pathname, initAuth]);

  useEffect(() => {
    return () => {
      if (unsubscribeRef.current) {
        unsubscribeRef.current();
      }
    };
  }, []);

  const login = useCallback(async (email: string, pass: string) => {
    setLoading(true);
    try {
      const [{ signInWithEmailAndPassword }, { getFirebaseAuth }] = await Promise.all([
        import("firebase/auth"),
        import("@/shared/lib/firebase"),
      ]);
      const auth = await getFirebaseAuth();
      void initAuth();
      await signInWithEmailAndPassword(auth, email, pass);
      try {
        window.localStorage.setItem(HAS_AUTH_SESSION_KEY, "1");
      } catch {
        // ignore
      }
    } finally {
      setLoading(false);
    }
  }, [initAuth]);

  const registerClient = useCallback(async (
    email: string,
    pass: string,
    profileData: Omit<ClientProfile, "userId" | "email" | "role">
  ) => {
    setLoading(true);
    try {
      const [
        { createUserWithEmailAndPassword },
        { getFirebaseAuth },
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
      const auth = await getFirebaseAuth();
      void initAuth();
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      const uid = cred.user.uid;

      try {
        window.localStorage.setItem(HAS_AUTH_SESSION_KEY, "1");
      } catch {
        // ignore
      }

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
  }, [initAuth]);

  const logout = useCallback(async () => {
    try {
      const [{ signOut: fbSignOut }, { getFirebaseAuth }] = await Promise.all([
        import("firebase/auth"),
        import("@/shared/lib/firebase"),
      ]);
      const auth = await getFirebaseAuth();
      await fbSignOut(auth);
    } finally {
      try {
        window.localStorage.removeItem(HAS_AUTH_SESSION_KEY);
      } catch {
        // ignore
      }
      setUser(null);
      setProfile(null);
      setRole("cliente");
    }
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
