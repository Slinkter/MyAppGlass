/**
 * @file budgetsRepository.ts
 * @description Lecturas del presupuesto formal (`presupuestos/{PRES-0001}`). Solo lectura:
 * las reglas no permiten escribir desde el cliente; se escribe con `budgetFunctions.ts`.
 * @module entities/budget/api
 */
import { collection, doc, getDoc, limit, onSnapshot, orderBy, query, type Unsubscribe } from "firebase/firestore";
import { db } from "@/shared/lib/firebase";
import { logger } from "@/shared/utils/logger";
import { presupuestoSchema, type Presupuesto } from "../model";

const BUDGETS_COLLECTION = "presupuestos";
/** El panel filtra en memoria; con este tope no hace falta un índice compuesto. */
const LIST_LIMIT = 200;

function parseBudget(id: string, data: unknown): Presupuesto | null {
  const parsed = presupuestoSchema.safeParse(data);
  if (!parsed.success) {
    logger.warn(`Presupuesto ${id} con formato inesperado; se omite del listado`);
    return null;
  }
  return parsed.data;
}

/** Suscripción a los presupuestos más recientes. */
export const subscribeToBudgets = (
  onData: (budgets: Presupuesto[]) => void,
  onError: (error: unknown) => void
): Unsubscribe =>
  onSnapshot(
    query(collection(db, BUDGETS_COLLECTION), orderBy("createdAt", "desc"), limit(LIST_LIMIT)),
    (snapshot) => {
      onData(
        snapshot.docs
          .map((docSnap) => parseBudget(docSnap.id, docSnap.data()))
          .filter((b): b is Presupuesto => b !== null)
      );
    },
    onError
  );

/** Suscripción a un presupuesto. Entrega null si no existe. */
export const subscribeToBudget = (
  numero: string,
  onData: (budget: Presupuesto | null) => void,
  onError: (error: unknown) => void
): Unsubscribe =>
  onSnapshot(
    doc(db, BUDGETS_COLLECTION, numero),
    (snap) => onData(snap.exists() ? parseBudget(snap.id, snap.data()) : null),
    onError
  );

/** Lee un presupuesto una sola vez. */
export const getBudget = async (numero: string): Promise<Presupuesto | null> => {
  const snap = await getDoc(doc(db, BUDGETS_COLLECTION, numero));
  return snap.exists() ? parseBudget(snap.id, snap.data()) : null;
};
