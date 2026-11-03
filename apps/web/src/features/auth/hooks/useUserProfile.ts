import { useAuth } from "@/features/auth/context/AuthContext";

/** Expone el perfil de cliente y el rol del usuario autenticado. */
export const useUserProfile = () => {
  const { profile, role, user, loading } = useAuth();
  return { profile, role, user, loading, isAdmin: role === "admin" };
};
