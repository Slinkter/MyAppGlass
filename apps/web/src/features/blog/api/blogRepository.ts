// Las lecturas usan *FromServer: sin conexión lanzan error en lugar de devolver la caché
// local vacía, y así las páginas públicas conservan los datos leídos en build.
import {
  collection,
  doc,
  getDocFromServer,
  getDocsFromServer,
  setDoc,
  updateDoc,
  deleteDoc,
  query,
  where,
  orderBy,
  serverTimestamp,
  type DocumentData,
} from "firebase/firestore";
import { db } from "@/shared/lib/firebase";
import { logger } from "@/shared/utils/logger";
import {
  BlogPostSchema,
  CreateBlogPostSchema,
  UpdateBlogPostSchema,
  type BlogPost,
  type CreateBlogPostInput,
  type UpdateBlogPostInput,
} from "@/shared/api/firebase/types";

const COLLECTION_NAME = "blogPosts";

const mapDocToBlogPost = (id: string, data: DocumentData): BlogPost => {
  const raw = {
    id,
    ...data,
  };
  return BlogPostSchema.parse(raw);
};

export interface GetBlogPostsFilter {
  publishedOnly?: boolean;
}

/**
 * Obtiene los artículos del blog ordenados por fecha descendente.
 * Filtra `publishedOnly` en memoria para no depender de un índice compuesto en Firestore.
 */
export const getBlogPosts = async (
  filter: GetBlogPostsFilter = {}
): Promise<BlogPost[]> => {
  const { publishedOnly = false } = filter;

  try {
    const postsRef = collection(db, COLLECTION_NAME);
    const q = query(postsRef, orderBy("date", "desc"));
    const snapshot = await getDocsFromServer(q);

    const items: BlogPost[] = [];
    snapshot.forEach((docSnap) => {
      try {
        const post = mapDocToBlogPost(docSnap.id, docSnap.data());
        if (!publishedOnly || post.published) {
          items.push(post);
        }
      } catch (parseError) {
        logger.error("Error al validar esquema de artículo de blog", parseError, {
          docId: docSnap.id,
        });
      }
    });

    return items;
  } catch (error) {
    logger.error("Error al obtener artículos del blog de Firestore", error);
    throw error;
  }
};

/**
 * Obtiene un artículo del blog por su slug.
 */
export const getBlogPostBySlug = async (slug: string): Promise<BlogPost | null> => {
  try {
    const postsRef = collection(db, COLLECTION_NAME);
    const q = query(postsRef, where("slug", "==", slug));
    const snapshot = await getDocsFromServer(q);

    if (snapshot.empty) {
      return null;
    }

    const firstDoc = snapshot.docs[0];
    return mapDocToBlogPost(firstDoc.id, firstDoc.data());
  } catch (error) {
    logger.error("Error al obtener artículo por slug de Firestore", error, { slug });
    throw error;
  }
};

/**
 * Crea un nuevo artículo de blog en Firestore.
 */
export const createBlogPost = async (
  input: CreateBlogPostInput
): Promise<BlogPost> => {
  const validated = CreateBlogPostSchema.parse(input);

  try {
    const postsRef = collection(db, COLLECTION_NAME);
    const docRef = validated.id ? doc(postsRef, validated.id) : doc(postsRef);

    const payload = {
      ...validated,
      id: docRef.id,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    };

    await setDoc(docRef, payload);
    logger.info("Artículo de blog creado exitosamente en Firestore", { id: docRef.id });

    const created = await getDocFromServer(docRef);
    return mapDocToBlogPost(created.id, created.data() || payload);
  } catch (error) {
    logger.error("Error al crear artículo de blog en Firestore", error, { input });
    throw error;
  }
};

/**
 * Actualiza un artículo de blog existente en Firestore.
 */
export const updateBlogPost = async (
  id: string,
  input: UpdateBlogPostInput
): Promise<BlogPost> => {
  const validated = UpdateBlogPostSchema.parse(input);

  try {
    const docRef = doc(db, COLLECTION_NAME, id);

    const payload = {
      ...validated,
      updatedAt: serverTimestamp(),
    };

    await updateDoc(docRef, payload);
    logger.info("Artículo de blog actualizado exitosamente en Firestore", { id });

    const updated = await getDocFromServer(docRef);
    if (!updated.exists()) {
      throw new Error(`Artículo con id ${id} no encontrado tras actualizar.`);
    }

    return mapDocToBlogPost(updated.id, updated.data());
  } catch (error) {
    logger.error("Error al actualizar artículo de blog en Firestore", error, { id, input });
    throw error;
  }
};

/**
 * Elimina un artículo de blog en Firestore.
 */
export const deleteBlogPost = async (id: string): Promise<void> => {
  try {
    const docRef = doc(db, COLLECTION_NAME, id);
    await deleteDoc(docRef);
    logger.info("Artículo de blog eliminado exitosamente de Firestore", { id });
  } catch (error) {
    logger.error("Error al eliminar artículo de blog de Firestore", error, { id });
    throw error;
  }
};
