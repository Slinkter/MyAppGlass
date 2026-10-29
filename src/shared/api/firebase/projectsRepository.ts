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
  ProjectSchema,
  CreateProjectSchema,
  UpdateProjectSchema,
  type Project,
  type CreateProjectInput,
  type UpdateProjectInput,
} from "./types";

const COLLECTION_NAME = "projects";

const mapDocToProject = (id: string, data: DocumentData): Project => {
  const raw = {
    id,
    ...data,
  };
  return ProjectSchema.parse(raw);
};

export interface GetProjectsFilter {
  publishedOnly?: boolean;
  serviceId?: string;
}

/**
 * Obtiene proyectos con filtros opcionales (publicados, por serviceId)
 */
export const getProjects = async (
  filter: GetProjectsFilter = {}
): Promise<Project[]> => {
  const { publishedOnly = false, serviceId } = filter;

  try {
    const projectsRef = collection(db, COLLECTION_NAME);
    const constraints: QueryConstraint[] = [];

    if (publishedOnly) {
      constraints.push(where("published", "==", true));
    }
    if (serviceId) {
      constraints.push(where("serviceId", "==", serviceId));
    }
    constraints.push(orderBy("createdAt", "desc"));

    const q = query(projectsRef, ...constraints);
    const snapshot = await getDocs(q);

    const items: Project[] = [];
    snapshot.forEach((docSnap) => {
      try {
        items.push(mapDocToProject(docSnap.id, docSnap.data()));
      } catch (parseError) {
        logger.error("Error al validar esquema de proyecto", parseError, {
          docId: docSnap.id,
        });
      }
    });

    return items;
  } catch (error) {
    logger.error("Error al obtener lista de proyectos de Firestore", error, {
      filter,
    });
    throw error;
  }
};

/**
 * Obtiene un proyecto por su ID
 */
export const getProjectById = async (id: string): Promise<Project | null> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    const snapshot = await getDoc(docRef);

    if (!snapshot.exists()) {
      return null;
    }

    return mapDocToProject(snapshot.id, snapshot.data());
  } catch (error) {
    logger.error("Error al obtener proyecto por ID de Firestore", error, { id });
    throw error;
  }
};

/**
 * Obtiene un proyecto por su slug
 */
export const getProjectBySlug = async (slug: string): Promise<Project | null> => {
  try {
    const projectsRef = collection(db, COLLECTION_NAME);
    const q = query(projectsRef, where("slug", "==", slug));
    const snapshot = await getDocs(q);

    if (snapshot.empty) {
      return null;
    }

    const firstDoc = snapshot.docs[0];
    return mapDocToProject(firstDoc.id, firstDoc.data());
  } catch (error) {
    logger.error("Error al obtener proyecto por slug de Firestore", error, { slug });
    throw error;
  }
};

/**
 * Obtiene proyectos asociados a un servicio en particular
 */
export const getProjectsByServiceId = async (
  serviceId: string,
  publishedOnly = true
): Promise<Project[]> => {
  return getProjects({ serviceId, publishedOnly });
};

/**
 * Crea un nuevo proyecto en Firestore
 */
export const createProject = async (
  input: CreateProjectInput
): Promise<Project> => {
  const validated = CreateProjectSchema.parse(input);

  try {
    const projectsRef = collection(db, COLLECTION_NAME);
    const docRef = validated.id ? doc(projectsRef, validated.id) : doc(projectsRef);

    const payload = {
      ...validated,
      id: docRef.id,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(docRef, payload);
    logger.info("Proyecto creado exitosamente en Firestore", { id: docRef.id });

    const created = await getDoc(docRef);
    return mapDocToProject(created.id, created.data() || payload);
  } catch (error) {
    logger.error("Error al crear proyecto en Firestore", error, { input });
    throw error;
  }
};

/**
 * Actualiza un proyecto existente en Firestore
 */
export const updateProject = async (
  id: string,
  input: UpdateProjectInput
): Promise<Project> => {
  const validated = UpdateProjectSchema.parse(input);

  try {
    const docRef = doc(db, COLLECTION_NAME, id);

    const payload = {
      ...validated,
      updatedAt: serverTimestamp(),
    };

    await updateDoc(docRef, payload);
    logger.info("Proyecto actualizado exitosamente en Firestore", { id });

    const updated = await getDoc(docRef);
    if (!updated.exists()) {
      throw new Error(`Proyecto con id ${id} no encontrado tras actualizar.`);
    }

    return mapDocToProject(updated.id, updated.data());
  } catch (error) {
    logger.error("Error al actualizar proyecto en Firestore", error, { id, input });
    throw error;
  }
};

/**
 * Elimina un proyecto en Firestore
 */
export const deleteProject = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
    logger.info("Proyecto eliminado exitosamente de Firestore", { id });
  } catch (error) {
    logger.error("Error al eliminar proyecto de Firestore", error, { id });
    throw error;
  }
};
