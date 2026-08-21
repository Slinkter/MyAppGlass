import React, { createContext, useContext, useEffect, useState } from "react";
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
        try {
          // Obtener rol del usuario desde Firestore
          const userDoc = await getDoc(doc(db, "users", currentUser.uid));
          if (userDoc.exists()) {
            const data = userDoc.data();
            const fetchedRole = String(data?.role || "").toLowerCase().trim();
            setRole(fetchedRole === "admin" ? "admin" : "cliente");
          } else if (currentUser.email && currentUser.email.toLowerCase().includes("admin")) {
            // Fallback por convención si aún no se sincroniza Firestore
            setRole("admin");
          } else {
            setRole("cliente");
          }

          // Obtener perfil de cliente si existe
          const clientDoc = await getDoc(doc(db, "clientes", currentUser.uid));
          if (clientDoc.exists()) {
            setProfile(clientDoc.data() as ClientProfile);
          }
        } catch (err) {
          logger.error("Error fetching user profile/role", err);
          if (currentUser.email && currentUser.email.toLowerCase().includes("admin")) {
            setRole("admin");
          }
        }
      } else {
        setRole("cliente");
        setProfile(null);
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, pass: string) => {
    setLoading(true);
    try {
      await signInWithEmailAndPassword(auth, email, pass);
    } finally {
      setLoading(false);
    }
  };

  const registerClient = async (
    email: string,
    pass: string,
    profileData: Omit<ClientProfile, "userId" | "email" | "role">
  ) => {
    setLoading(true);
    try {
      const cred = await createUserWithEmailAndPassword(auth, email, pass);
      const uid = cred.user.uid;

      // Crear documento en users con rol cliente
      await setDoc(doc(db, "users", uid), {
        uid,
        email,
        role: "cliente",
        createdAt: serverTimestamp(),
      });

      // Crear documento en clientes con datos de contacto
      const fullProfile: ClientProfile = {
        userId: uid,
        email,
        role: "cliente",
        ...profileData,
        createdAt: serverTimestamp(),
      };
      await setDoc(doc(db, "clientes", uid), fullProfile);
      setProfile(fullProfile);
      setRole("cliente");
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    await fbSignOut(auth);
    setUser(null);
    setProfile(null);
    setRole("cliente");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        role,
        profile,
        loading,
        login,
        registerClient,
        logout,
      }}
    >
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
