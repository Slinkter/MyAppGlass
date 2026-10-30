import {
  collection,
  doc,
  getDoc,
  getDocs,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  type DocumentData,
  type QueryConstraint,
} from "firebase/firestore";
import { db } from "@/shared/lib/firebase";
import { logger } from "@/shared/utils/logger";
import {
  ServiceSchema,
  CreateServiceSchema,
  UpdateServiceSchema,
  type Service,
  type CreateServiceInput,
  type UpdateServiceInput,
} from "./types";

const COLLECTION_NAME = "services";

const mapDocToService = (id: string, data: DocumentData): Service => {
  const raw = {
    id,
    ...data,
  };
  return ServiceSchema.parse(raw);
};

export interface GetServicesFilter {
  publishedOnly?: boolean;
}

/**
 * Obtiene todos los servicios ordenados por `order` ascendente
 */
export const getServices = async (
  filter: GetServicesFilter = {}
): Promise<Service[]> => {
  const { publishedOnly = false } = filter;

  try {
    const servicesRef = collection(db, COLLECTION_NAME);
    const constraints: QueryConstraint[] = [];

    if (publishedOnly) {
      constraints.push(where("published", "==", true));
    }
    constraints.push(orderBy("order", "asc"));

    const q = query(servicesRef, ...constraints);
    const snapshot = await getDocs(q);

    const items: Service[] = [];
    snapshot.forEach((docSnap) => {
      try {
        items.push(mapDocToService(docSnap.id, docSnap.data()));
      } catch (parseError) {
        logger.error("Error al validar esquema de servicio", parseError, {
          docId: docSnap.id,
        });
      }
    });

    return items;
  } catch (error) {
    logger.error("Error al obtener lista de servicios de Firestore", error);
    throw error;
  }
};

/**
 * Obtiene un servicio por su ID
 */
export const getServiceById = async (id: string): Promise<Service | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
      return null;
    }

    return mapDocToService(snapshot.id, snapshot.data());
  } catch (error) {
    logger.error("Error al obtener servicio por ID de Firestore", error, { id });
    throw error;
  }
};

/**
 * Obtiene un servicio por su slug
 */
export const getServiceBySlug = async (slug: string): Promise<Service | null> => {
  try {
    const servicesRef = collection(db, COLLECTION_NAME);
    const q = query(servicesRef, where("slug", "==", slug));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return null;
    }

    const firstDoc = snapshot.docs[0];
    return mapDocToService(firstDoc.id, firstDoc.data());
  } catch (error) {
    logger.error("Error al obtener servicio por slug de Firestore", error, { slug });
    throw error;
  }
};

/**
 * Crea un nuevo servicio en Firestore
 */
export const createService = async (
  input: CreateServiceInput
): Promise<Service> => {
  const validated = CreateServiceSchema.parse(input);

  try {
    const servicesRef = collection(db, COLLECTION_NAME);
    const docRef = validated.id ? doc(servicesRef, validated.id) : doc(servicesRef);

    const payload = {
      ...validated,
      id: docRef.id,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(docRef, payload);
    logger.info("Servicio creado exitosamente en Firestore", { id: docRef.id });

    const created = await getDoc(docRef);
    return mapDocToService(created.id, created.data() || payload);
  } catch (error) {
    logger.error("Error al crear servicio en Firestore", error, { input });
    throw error;
  }
};

/**
 * Actualiza un servicio existente en Firestore
 */
export const updateService = async (
  id: string,
  input: UpdateServiceInput
): Promise<Service> => {
  const validated = UpdateServiceSchema.parse(input);

  try {
    const docRef = doc(db, COLLECTION_NAME, id);

    const payload = {
      ...validated,
      updatedAt: serverTimestamp(),
    };

    await updateDoc(docRef, payload);
    logger.info("Servicio actualizado exitosamente en Firestore", { id });

    const updated = await getDoc(docRef);
    if (!updated.exists()) {
      throw new Error(`Servicio con id ${id} no encontrado tras actualizar.`);
    }

    return mapDocToService(updated.id, updated.data());
  } catch (error) {
    logger.error("Error al actualizar servicio en Firestore", error, { id, input });
    throw error;
  }
};

/**
 * Elimina un servicio en Firestore
 */
export const deleteService = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
    logger.info("Servicio eliminado exitosamente de Firestore", { id });
  } catch (error) {
    logger.error("Error al eliminar servicio de Firestore", error, { id });
    throw error;
  }
};
