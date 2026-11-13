/**
 * @file purchaseOrderService.ts
 * @description Acceso a Firestore para los pedidos de compra a proveedores
 * (colección `pedidos_proveedor`) y su correlativo en `contadores`.
 * Uso interno del panel: el cliente nunca ve estos datos.
 * @module entities/supplier/api
 */

import {
  collection,
  doc,
  limit,
  onSnapshot,
  orderBy,
  query,
  runTransaction,
  serverTimestamp,
  updateDoc,
} from "firebase/firestore";
import { db } from "@/shared/lib/firebase";
import { limaYear } from "@/entities/quote/lib/quoteNumber";
import type { PurchaseLine, PurchaseOrder, PurchaseOrderStatus } from "../model/purchaseOrder";
import { formatPurchaseNumber, purchaseCounterDocId } from "../lib/purchaseNumber";
import { purchaseTotal } from "../lib/groupBySupplier";

const ORDERS_COLLECTION = "pedidos_proveedor";
const COUNTERS_COLLECTION = "contadores";
const LISTEN_LIMIT = 100;

/** Datos necesarios para crear un pedido de compra. */
export interface CreatePurchaseOrderInput {
  lineas: PurchaseLine[];
  nota: string;
  estado: "borrador" | "por_aprobar";
  user: { uid: string; name: string };
}

/**
 * Crea un pedido reservando el siguiente correlativo `PC-{año}-{seq}` dentro de una transacción.
 * El contador vive en `contadores/{purchaseCounterDocId(año)}` y solo contiene el campo `seq`.
 * @throws Error si el pedido no tiene líneas.
 */
async function create(input: CreatePurchaseOrderInput): Promise<PurchaseOrder> {
  if (input.lineas.length === 0) {
    throw new Error("El pedido no tiene productos.");
  }

  const year = limaYear();
  const counterRef = doc(db, COUNTERS_COLLECTION, purchaseCounterDocId(year));
  const total = purchaseTotal(input.lineas);

  return runTransaction(db, async (tx) => {
    const snap = await tx.get(counterRef);
    const seq = (snap.exists() ? Number(snap.data().seq) || 0 : 0) + 1;
    if (snap.exists()) tx.update(counterRef, { seq });
    else tx.set(counterRef, { seq });

    const number = formatPurchaseNumber(year, seq);
    const order: Omit<PurchaseOrder, "id" | "createdAt"> & { createdAt: unknown } = {
      number,
      estado: input.estado,
      lineas: input.lineas,
      total,
      nota: input.nota,
      createdByUid: input.user.uid,
      createdByName: input.user.name,
      approvedByName: null,
      approvedAt: null,
      createdAt: serverTimestamp(),
    };
    tx.set(doc(db, ORDERS_COLLECTION, number), order);

    return {
      id: number,
      number,
      estado: input.estado,
      lineas: input.lineas,
      total,
      nota: input.nota,
      createdByUid: input.user.uid,
      createdByName: input.user.name,
      approvedByName: null,
      approvedAt: null,
    };
  });
}

/**
 * Escucha en tiempo real los últimos pedidos, del más reciente al más antiguo.
 * @returns Función para cancelar la suscripción.
 */
function listen(
  onData: (orders: PurchaseOrder[]) => void,
  onError: (e: unknown) => void,
): () => void {
  const q = query(
    collection(db, ORDERS_COLLECTION),
    orderBy("createdAt", "desc"),
    limit(LISTEN_LIMIT),
  );
  return onSnapshot(
    q,
    (snapshot) => {
      const orders = snapshot.docs.map((d) => ({
        id: d.id,
        ...(d.data() as Omit<PurchaseOrder, "id">),
      }));
      onData(orders);
    },
    onError,
  );
}

/**
 * Cambia el estado de un pedido. Al aprobar guarda quién aprobó y cuándo;
 * al volver a borrador limpia esos campos.
 */
async function setStatus(
  id: string,
  estado: PurchaseOrderStatus,
  approverName?: string,
): Promise<void> {
  const ref = doc(db, ORDERS_COLLECTION, id);
  if (estado === "aprobado") {
    await updateDoc(ref, {
      estado,
      approvedByName: approverName ?? null,
      approvedAt: serverTimestamp(),
    });
    return;
  }
  if (estado === "borrador") {
    await updateDoc(ref, { estado, approvedByName: null, approvedAt: null });
    return;
  }
  await updateDoc(ref, { estado });
}

/** Reemplaza las líneas, la nota y el total de un pedido. */
async function updateLines(id: string, lineas: PurchaseLine[], nota: string): Promise<void> {
  await updateDoc(doc(db, ORDERS_COLLECTION, id), {
    lineas,
    nota,
    total: purchaseTotal(lineas),
  });
}

/** Servicio de pedidos de compra a proveedores. */
export const purchaseOrderService = {
  create,
  listen,
  setStatus,
  updateLines,
};
