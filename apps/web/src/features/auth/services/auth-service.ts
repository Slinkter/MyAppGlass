import { clientProfileSchema, type UserRole } from "@/shared/schemas/ecommerce-schemas";

/** Normaliza el rol leído de Firestore: solo "admin" eleva privilegios. */
export const normalizeRole = (raw: string | null | undefined): UserRole =>
  String(raw ?? "").toLowerCase().trim() === "admin" ? "admin" : "cliente";

/** DNI (8 dígitos) o RUC (11 dígitos). */
export const isValidDniRuc = (value: string): boolean => /^(\d{8}|\d{11})$/.test(value);

/** Valida los datos de registro de un cliente; devuelve mensajes de error. */
export const validateClientRegistration = (data: unknown): { ok: boolean; errors: string[] } => {
  const result = clientProfileSchema.safeParse(data);
  return result.success
    ? { ok: true, errors: [] }
    : { ok: false, errors: result.error.issues.map((i) => i.message) };
};
