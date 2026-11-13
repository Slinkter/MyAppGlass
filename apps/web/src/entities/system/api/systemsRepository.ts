/**
 * @file systemsRepository.ts
 * @description Acceso a la colección `sistemas` de Firestore: lectura en tiempo real para
 * el administrador y lectura de publicados por servicio para las páginas públicas.
 * @module entities/system/api
 */
import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  where,
  type DocumentData,
  type QueryDocumentSnapshot,
  type QuerySnapshot,
} from "firebase/firestore";
import { db } from "@/shared/lib/firebase";
import { logger } from "@/shared/utils/logger";
import type {
  CatalogSystem,
  CatalogSystemInput,
  PublicSystem,
  SystemStatus,
} from "../model";

const COLLECTION_NAME = "sistemas";
/** Copia pública: lo único que lee la web del cliente. */
const PUBLIC_COLLECTION_NAME = "sistemas_publicos";

/** Deja solo los campos que puede ver el cliente (sin datos de proveedor). */
const toPublic = (data: CatalogSystemInput): Omit<PublicSystem, "id"> => ({
  serviceSlug: data.serviceSlug,
  nombre: data.nombre,
  descripcion: data.descripcion,
  tipoApertura: data.tipoApertura,
  vidrio: data.vidrio ?? [],
  pricePending: data.pricePending !== false,
  ...(typeof data.order === "number" ? { order: data.order } : {}),
});

/** Convierte un documento de Firestore en `CatalogSystem`. */
const mapDoc = (docSnap: QueryDocumentSnapshot<DocumentData>): CatalogSystem => {
  const data = docSnap.data() as CatalogSystemInput;
  return { ...data, id: docSnap.id };
};

const mapSnapshot = (snapshot: QuerySnapshot<DocumentData>): CatalogSystem[] =>
  snapshot.docs.map(mapDoc);

/**
 * Escucha en tiempo real todos los sistemas (vista de administración).
 * Devuelve la función para cancelar la suscripción.
 */
export const listenAll = (
  onData: (systems: CatalogSystem[]) => void,
  onError: (error: Error) => void
): (() => void) => {
  const colRef = collection(db, COLLECTION_NAME);
  return onSnapshot(
    colRef,
    (snapshot) => onData(mapSnapshot(snapshot)),
    (error) => {
      logger.error("Error al escuchar sistemas de Firestore", error);
      onError(error);
    }
  );
};

/**
 * Sistemas publicados de un servicio, para las páginas públicas.
 * Lee la copia pública, que no contiene datos de proveedores.
 */
export const getPublishedByService = async (
  serviceSlug: string
): Promise<PublicSystem[]> => {
  try {
    const q = query(
      collection(db, PUBLIC_COLLECTION_NAME),
      where("serviceSlug", "==", serviceSlug)
    );
    const snapshot = await getDocs(q);
    return snapshot.docs
      .map((d) => ({ ...(d.data() as Omit<PublicSystem, "id">), id: d.id }))
      .sort((x, y) => (x.order ?? 999) - (y.order ?? 999));
  } catch (error) {
    logger.error("Error al obtener sistemas publicados de Firestore", error, {
      serviceSlug,
    });
    throw error;
  }
};

/**
 * Crea el sistema solo si el documento no existe.
 * Devuelve `true` si lo creó y `false` si ya existía (no lo sobrescribe).
 */
export const createIfMissing = async (
  id: string,
  data: CatalogSystemInput
): Promise<boolean> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const existing = await getDoc(docRef);
    if (existing.exists()) {
      return false;
    }
    await setDoc(docRef, data);
    return true;
  } catch (error) {
    logger.error("Error al crear sistema en Firestore", error, { id });
    throw error;
  }
};

/**
 * Cambia el estado de publicación de un sistema.
 */
export const setStatus = async (id: string, estado: SystemStatus): Promise<void> => {
  try {
    const ref = doc(db, COLLECTION_NAME, id);
    const publicRef = doc(db, PUBLIC_COLLECTION_NAME, id);
    if (estado === "publicado") {
      const snap = await getDoc(ref);
      if (!snap.exists()) throw new Error("El sistema no existe.");
      await setDoc(publicRef, toPublic(snap.data() as CatalogSystemInput));
      await updateDoc(ref, { estado });
    } else {
      await updateDoc(ref, { estado });
      await deleteDoc(publicRef);
    }
  } catch (error) {
    logger.error("Error al cambiar estado del sistema en Firestore", error, { id, estado });
    throw error;
  }
};

/**
 * Elimina un sistema.
 */
export const remove = async (id: string): Promise<void> => {
  try {
    await deleteDoc(doc(db, PUBLIC_COLLECTION_NAME, id));
    await deleteDoc(doc(db, COLLECTION_NAME, id));
  } catch (error) {
    logger.error("Error al eliminar sistema de Firestore", error, { id });
    throw error;
  }
};
