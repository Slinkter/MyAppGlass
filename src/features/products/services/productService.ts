import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "@/shared/lib/firebase";
import { Product, productSchema } from "@/shared/schemas/ecommerce-schemas";
import { INITIAL_PRODUCTS } from "@/features/products/data/initial-products";
import { logger } from "@/shared/utils/logger";

const PRODUCTS_COLL = "productos";

export const productService = {
  async getAllProducts(): Promise<Product[]> {
    try {
      const q = query(collection(db, PRODUCTS_COLL));
      const snapshot = await getDocs(q);
      if (!snapshot.empty) {
        return snapshot.docs.map((docSnap) => {
          const data = { id: docSnap.id, ...docSnap.data() };
          return productSchema.parse(data);
        });
      }
    } catch (err) {
      logger.error("Error al obtener productos de Firestore, usando catálogo base", err);
    }
    return INITIAL_PRODUCTS;
  },

  async getProductById(id: string): Promise<Product | null> {
    try {
      const docRef = doc(db, PRODUCTS_COLL, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return productSchema.parse({ id: docSnap.id, ...docSnap.data() });
      }
    } catch (err) {
      logger.error("Error al buscar producto por ID", err);
    }
    const fallback = INITIAL_PRODUCTS.find((p) => p.id === id);
    return fallback || null;
  },

  async createProduct(productData: Omit<Product, "id">): Promise<string> {
    const validated = productSchema.parse(productData);
    const docRef = await addDoc(collection(db, PRODUCTS_COLL), {
      ...validated,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp(),
    });
    return docRef.id;
  },

  async updateProduct(id: string, updates: Partial<Product>): Promise<void> {
    const docRef = doc(db, PRODUCTS_COLL, id);
    await updateDoc(docRef, {
      ...updates,
      updatedAt: serverTimestamp(),
    });
  },

  async deleteProduct(id: string): Promise<void> {
    const docRef = doc(db, PRODUCTS_COLL, id);
    await deleteDoc(docRef);
  },
};
