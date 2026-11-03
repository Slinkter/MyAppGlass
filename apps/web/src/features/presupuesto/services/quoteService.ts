import { doc, runTransaction, serverTimestamp } from "firebase/firestore";
import { db } from "@/shared/lib/firebase";
import { logger } from "@/shared/utils/logger";
import { counterDocId, formatQuoteNumber, limaYear } from "../utils/quoteNumber";
import type { QuoteCalculationInput } from "../utils/quoteCalculator";

export interface QuoteRequestPayload {
  userId: string;
  fullName: string;
  dniRuc: string;
  email: string;
  phone: string;
  address: string;
  district: string;
  params: QuoteCalculationInput;
  total: number;
}

/**
 * Reserva el siguiente correlativo (contador atómico en `contadores/presupuesto-AAAA`)
 * y guarda la solicitud en `presupuestos_solicitados/{numero}` en una sola transacción.
 */
export async function submitQuoteRequest(payload: QuoteRequestPayload): Promise<string> {
  const year = limaYear();
  const counterRef = doc(db, "contadores", counterDocId(year));
  try {
    return await runTransaction(db, async (tx) => {
      const snap = await tx.get(counterRef);
      const next = (snap.exists() ? Number(snap.data().seq) || 0 : 0) + 1;
      const number = formatQuoteNumber(year, next);
      if (snap.exists()) tx.update(counterRef, { seq: next });
      else tx.set(counterRef, { seq: next });
      tx.set(doc(db, "presupuestos_solicitados", number), {
        number,
        ...payload,
        status: "PENDIENTE",
        createdAt: serverTimestamp(),
      });
      return number;
    });
  } catch (error) {
    logger.error("No se pudo registrar el presupuesto", error);
    throw error;
  }
}
