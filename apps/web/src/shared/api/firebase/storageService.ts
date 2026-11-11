import {
  ref,
  uploadBytes,
  getDownloadURL,
  type StorageReference,
  type UploadMetadata,
} from "firebase/storage";
import { storage } from "@/shared/lib/firebase";
import { logger } from "@/shared/utils/logger";

/**
 * Entidades admitidas para almacenamiento estructurado
 */
export type StorageEntity = "services" | "projects" | "products";

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

