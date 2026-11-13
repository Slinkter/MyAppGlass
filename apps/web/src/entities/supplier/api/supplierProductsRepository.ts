import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "@/shared/lib/firebase";
import { logger } from "@/shared/utils/logger";
import type { SupplierId, SupplierProduct, SupplierProductType } from "../model";

const SUPPLIER_PRODUCTS_COLL = "proveedores_productos";

/** Convierte un documento de Firestore en un SupplierProduct, completando campos ausentes. */
function mapDocToSupplierProduct(id: string, data: Record<string, unknown>): SupplierProduct {
  return {
    id,
    apiId: typeof data.apiId === "number" ? data.apiId : 0,
    proveedor: data.proveedor as SupplierId,
    tipo: data.tipo as SupplierProductType,
    cod: typeof data.cod === "string" ? data.cod : "",
    descripcion: typeof data.descripcion === "string" ? data.descripcion : "",
    categoria: typeof data.categoria === "string" ? data.categoria : null,
    precio: typeof data.precio === "number" ? data.precio : null,
    imagenApi: typeof data.imagenApi === "string" ? data.imagenApi : null,
    imagenPath: typeof data.imagenPath === "string" ? data.imagenPath : null,
    imagenUrl: typeof data.imagenUrl === "string" ? data.imagenUrl : null,
    url: typeof data.url === "string" ? data.url : null,
    activo: data.activo === true,
  };
}

export const supplierProductsRepository = {
  /**
   * Escucha en tiempo real los productos activos del catálogo de proveedores.
   * Devuelve la función para cancelar la suscripción.
   */
  listen(
    onData: (products: SupplierProduct[]) => void,
    onError?: (err: unknown) => void
  ): () => void {
    const q = query(
      collection(db, SUPPLIER_PRODUCTS_COLL),
      where("activo", "==", true)
    );

    return onSnapshot(
      q,
      (snapshot) => {
        const products = snapshot.docs.map((docSnap) =>
          mapDocToSupplierProduct(docSnap.id, docSnap.data() as Record<string, unknown>)
        );
        onData(products);
      },
      (error) => {
        logger.warn("Listener de productos de proveedores falló");
        if (onError) onError(error);
      }
    );
  },
};
