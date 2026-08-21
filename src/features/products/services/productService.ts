import {
  collection,
  doc,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  query,
  onSnapshot,
  increment,
  serverTimestamp,
  writeBatch,
} from "firebase/firestore";
import { db } from "@/shared/lib/firebase";
import { Product, productSchema } from "@/shared/schemas/ecommerce-schemas";
import { INITIAL_PRODUCTS } from "@/features/products/data/initial-products";
import { logger } from "@/shared/utils/logger";

const PRODUCTS_COLL = "productos";

export const productService = {
  /**
   * Si la colección está vacía en Firestore, auto-siembra el catálogo inicial de productos.
   */
  async seedInitialProductsIfEmpty(): Promise<void> {
    try {
      const q = query(collection(db, PRODUCTS_COLL));
      const snapshot = await getDocs(q);
      if (snapshot.empty) {
        console.info("🌱 [GYA Almacén] Sembrando catálogo inicial de productos en Firestore...");
        const batch = writeBatch(db);
        INITIAL_PRODUCTS.forEach((prod) => {
          const docId = prod.id || `prod_${prod.sku.toLowerCase().replace(/[^a-z0-9]/g, "_")}`;
          const prodRef = doc(db, PRODUCTS_COLL, docId);
          batch.set(prodRef, {
            ...prod,
            id: docId,
            createdAt: serverTimestamp(),
            updatedAt: serverTimestamp(),
          }, { merge: true });
        });
        await batch.commit();
        console.info("✅ [GYA Almacén] Catálogo inicial sembrado con éxito en Firestore.");
      }
    } catch (err) {
      console.warn("⚠️ No se pudo auto-sembrar productos en Firestore (modo offline o reglas pendientes):", err);
    }
  },

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
      console.warn("⚠️ Error al obtener productos de Firestore, usando catálogo base", err);
    }
    return INITIAL_PRODUCTS;
  },

  listenToProducts(
    onData: (products: Product[]) => void,
    onError?: (err: unknown) => void
  ): () => void {
    // Intentar auto-siembra si Firestore está vacío
    this.seedInitialProductsIfEmpty();

    try {
      const q = query(collection(db, PRODUCTS_COLL));
      const unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          if (!snapshot.empty) {
            const products = snapshot.docs.map((docSnap) => {
              const data = { id: docSnap.id, ...docSnap.data() };
              return productSchema.parse(data);
            });
            onData(products);
          } else {
            onData(INITIAL_PRODUCTS);
          }
        },
        (error) => {
          console.warn("⚠️ Listener de productos Firestore falló, activando catálogo base en memoria", error);
          if (onError) onError(error);
          onData(INITIAL_PRODUCTS);
        }
      );
      return unsubscribe;
    } catch (err) {
      console.warn("⚠️ No se pudo iniciar el listener de productos", err);
      onData(INITIAL_PRODUCTS);
      return () => {};
    }
  },

  async getProductById(id: string): Promise<Product | null> {
    try {
      const docRef = doc(db, PRODUCTS_COLL, id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return productSchema.parse({ id: docSnap.id, ...docSnap.data() });
      }
    } catch (err) {
      console.warn("⚠️ Error al buscar producto por ID en Firestore", err);
    }
    const fallback = INITIAL_PRODUCTS.find((p) => p.id === id);
    return fallback || null;
  },

  async createProduct(productData: Omit<Product, "id">): Promise<string> {
    const validated = productSchema.parse(productData);
    try {
      const docRef = await addDoc(collection(db, PRODUCTS_COLL), {
        ...validated,
        createdAt: serverTimestamp(),
        updatedAt: serverTimestamp(),
      });
      return docRef.id;
    } catch (err) {
      console.warn("⚠️ [Firestore Fallback] No se pudo guardar producto en la nube, usando ID local:", err);
      return `prod_loc_${Date.now()}`;
    }
  },

  async updateProduct(id: string, updates: Partial<Product>): Promise<void> {
    try {
      const docRef = doc(db, PRODUCTS_COLL, id);
      await updateDoc(docRef, {
        ...updates,
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      console.warn("⚠️ [Firestore Fallback] No se pudo actualizar producto en la nube:", err);
    }
  },

  async replenishStock(id: string, quantityToAdd: number): Promise<void> {
    if (quantityToAdd <= 0) {
      throw new Error("La cantidad a ingresar debe ser mayor a 0");
    }
    try {
      const docRef = doc(db, PRODUCTS_COLL, id);
      await updateDoc(docRef, {
        stock: increment(quantityToAdd),
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      console.warn("⚠️ [Firestore Fallback] No se pudo reponer stock en la nube:", err);
    }
  },

  async updateStock(id: string, quantityToDecrease: number): Promise<void> {
    if (quantityToDecrease <= 0) {
      throw new Error("La cantidad a descontar debe ser mayor a 0");
    }
    try {
      const docRef = doc(db, PRODUCTS_COLL, id);
      await updateDoc(docRef, {
        stock: increment(-quantityToDecrease),
        updatedAt: serverTimestamp(),
      });
    } catch (err) {
      console.warn("⚠️ [Firestore Fallback] No se pudo descontar stock en la nube:", err);
    }
  },

  async deleteProduct(id: string): Promise<void> {
    try {
      const docRef = doc(db, PRODUCTS_COLL, id);
      await deleteDoc(docRef);
    } catch (err) {
      console.warn("⚠️ [Firestore Fallback] No se pudo eliminar producto en la nube:", err);
    }
  },
};
