import { doc, getDoc, setDoc, serverTimestamp } from "firebase/firestore";
import { db } from "@/shared/lib/firebase";

const USERS_COLLECTION = "users";

/** Devuelve el rol (normalizado) del usuario o null si el documento no existe. */
export const getUserRoleDoc = async (uid: string): Promise<string | null> => {
  const snap = await getDoc(doc(db, USERS_COLLECTION, uid));
  return snap.exists() ? String(snap.data()?.role || "").toLowerCase().trim() : null;
};

/** Aprovisiona el documento de usuario en su primer ingreso (merge). */
export const provisionUserDoc = (uid: string, email: string | null, role: string): Promise<void> =>
  setDoc(
    doc(db, USERS_COLLECTION, uid),
    { uid, email, role, createdAt: serverTimestamp(), updatedAt: serverTimestamp() },
    { merge: true }
  );

/** Crea el documento de usuario con rol cliente al registrarse. */
export const createClientUserDoc = (uid: string, email: string): Promise<void> =>
  setDoc(doc(db, USERS_COLLECTION, uid), {
    uid,
    email,
    role: "cliente",
    createdAt: serverTimestamp(),
  });
