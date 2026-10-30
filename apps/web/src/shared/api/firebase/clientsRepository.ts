import {
  collection,
  doc,
  getDoc,
  setDoc,
  addDoc,
  query,
  serverTimestamp,
  onSnapshot,
  type Unsubscribe,
} from "firebase/firestore";
import { db } from "@/shared/lib/firebase";
import type { ClientProfile } from "@/shared/schemas/ecommerce-schemas";

const CLIENTS_COLLECTION = "clientes";

/** Obtiene el perfil de cliente por uid (o undefined-like snapshot). */
export const getClientProfile = async (uid: string): Promise<ClientProfile | null> => {
  const snap = await getDoc(doc(db, CLIENTS_COLLECTION, uid));
  return snap.exists() ? (snap.data() as ClientProfile) : null;
};

/** Crea/reemplaza el perfil de cliente con id = uid. */
export const setClientProfile = (uid: string, profile: ClientProfile): Promise<void> =>
  setDoc(doc(db, CLIENTS_COLLECTION, uid), profile);

/** Suscripción en tiempo real a la colección de clientes. */
export const subscribeToClients = (
  onData: (clients: ClientProfile[]) => void,
  onError: (error: unknown) => void
): Unsubscribe =>
  onSnapshot(
    query(collection(db, CLIENTS_COLLECTION)),
    (snapshot) => {
      onData(
        snapshot.docs.map((docSnap) => ({
          userId: docSnap.id,
          ...docSnap.data(),
        })) as ClientProfile[]
      );
    },
    onError
  );

/** Agrega un cliente nuevo y devuelve el registro creado. */
export const addClient = async (
  data: Omit<ClientProfile, "userId" | "createdAt">
): Promise<ClientProfile> => {
  const clientData = { ...data, createdAt: serverTimestamp() };
  const docRef = await addDoc(collection(db, CLIENTS_COLLECTION), clientData);
  return { userId: docRef.id, ...clientData } as ClientProfile;
};
