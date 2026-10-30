import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
  listAll,
  type StorageReference,
  type UploadMetadata,
} from "firebase/storage";
import { storage } from "@/shared/lib/firebase";
import { logger } from "@/shared/utils/logger";

/**
 * Entidades admitidas para almacenamiento estructurado
 */
export type StorageEntity = "services" | "projects";

export interface UploadFileOptions {
  entity: StorageEntity;
  entityId: string;
  file: Blob | Uint8Array | ArrayBuffer;
  fileName: string;
  contentType?: string;
  customMetadata?: Record<string, string>;
}

export interface UploadResult {
  url: string;
  path: string;
  name: string;
}

/**
 * Sanitiza el nombre de un archivo removiendo caracteres no deseados
 */
const sanitizeFileName = (fileName: string): string => {
  return fileName.replace(/[^a-zA-Z0-9._-]/g, "_");
};

/**
 * Extrae el path de almacenamiento de Firebase a partir de una URL pública o devuelve el path directo
 */
export const extractStoragePath = (pathOrUrl: string): string => {
  if (!pathOrUrl.startsWith("http://") && !pathOrUrl.startsWith("https://")) {
    return pathOrUrl.startsWith("/") ? pathOrUrl.slice(1) : pathOrUrl;
  }

  try {
    const url = new URL(pathOrUrl);
    // Formato Firebase Storage: .../o/{encodedPath}?alt=media...
    const matches = url.pathname.match(/\/o\/(.+)$/);
    if (matches && matches[1]) {
      return decodeURIComponent(matches[1]);
    }
  } catch (error) {
    logger.warn("No se pudo parsear URL de Firebase Storage, usando original", {
      pathOrUrl,
      error,
    });
  }

  return pathOrUrl;
};

/**
 * Sube un archivo a Firebase Storage bajo la estructura /{entity}/{entityId}/{fileName}
 */
export const uploadFile = async ({
  entity,
  entityId,
  file,
  fileName,
  contentType,
  customMetadata,
}: UploadFileOptions): Promise<UploadResult> => {
  const safeName = `${Date.now()}_${sanitizeFileName(fileName)}`;
  const fullPath = `${entity}/${entityId}/${safeName}`;

  try {
    const storageRef: StorageReference = ref(storage, fullPath);
    const metadata: UploadMetadata = {
      contentType: contentType || (file instanceof Blob ? file.type : undefined),
      customMetadata,
    };

    await uploadBytes(storageRef, file, metadata);
    const url = await getDownloadURL(storageRef);

    logger.info("Archivo subido a Firebase Storage con éxito", {
      fullPath,
      entity,
      entityId,
    });

    return {
      url,
      path: fullPath,
      name: safeName,
    };
  } catch (error) {
    logger.error("Error al subir archivo a Firebase Storage", error, {
      fullPath,
      entity,
      entityId,
    });
    throw error;
  }
};

/**
 * Sube un archivo a la carpeta /services/{serviceId}
 */
export const uploadServiceFile = async (
  serviceId: string,
  file: Blob | Uint8Array | ArrayBuffer,
  fileName: string,
  contentType?: string
): Promise<UploadResult> => {
  return uploadFile({
    entity: "services",
    entityId: serviceId,
    file,
    fileName,
    contentType,
  });
};

/**
 * Sube un archivo a la carpeta /projects/{projectId}
 */
export const uploadProjectFile = async (
  projectId: string,
  file: Blob | Uint8Array | ArrayBuffer,
  fileName: string,
  contentType?: string
): Promise<UploadResult> => {
  return uploadFile({
    entity: "projects",
    entityId: projectId,
    file,
    fileName,
    contentType,
  });
};

/**
 * Elimina un archivo en Firebase Storage dado su path o URL pública
 */
export const deleteFile = async (pathOrUrl: string): Promise<void> => {
  const storagePath = extractStoragePath(pathOrUrl);

  try {
    const storageRef: StorageReference = ref(storage, storagePath);
    await deleteObject(storageRef);
    logger.info("Archivo eliminado de Firebase Storage", { path: storagePath });
  } catch (error) {
    logger.error("Error al eliminar archivo de Firebase Storage", error, {
      path: storagePath,
    });
    throw error;
  }
};

/**
 * Elimina todos los archivos dentro de la carpeta de una entidad (ej. services/{serviceId})
 */
export const deleteEntityFolder = async (
  entity: StorageEntity,
  entityId: string
): Promise<void> => {
  const folderPath = `${entity}/${entityId}`;

  try {
    const folderRef = ref(storage, folderPath);
    const res = await listAll(folderRef);

    const deletePromises = res.items.map((itemRef) => deleteObject(itemRef));
    await Promise.all(deletePromises);

    logger.info("Carpeta de entidad eliminada de Firebase Storage", {
      folderPath,
      filesDeleted: res.items.length,
    });
  } catch (error) {
    logger.error("Error al eliminar carpeta de entidad de Firebase Storage", error, {
      folderPath,
    });
    throw error;
  }
};
