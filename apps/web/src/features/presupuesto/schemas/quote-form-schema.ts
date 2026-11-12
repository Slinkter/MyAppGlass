import { z } from "zod";
import { QUOTE_TEXTS } from "../components/quoteTexts";

/** Límites razonables de medidas en metros (evita 0 o valores absurdos). */
export const QUOTE_LIMITS = { minSide: 0.3, maxWidth: 8, maxHeight: 6, maxLines: 20 } as const;

const phoneDigits = (v: string) => v.replace(/[\s+()-]/g, "");

export const customerSchema = z.object({
  fullName: z.string().trim().min(3, "Ingrese su nombre completo").max(200, "Máximo 200 caracteres"),
  phone: z
    .string()
    .trim()
    .refine((v) => /^(51)?\d{7,9}$/.test(phoneDigits(v)), "Ingrese un teléfono válido (7 a 9 dígitos)"),
  email: z
    .string()
    .trim()
    .max(254, "Máximo 254 caracteres")
    .refine((v) => v === "" || z.email().safeParse(v).success, "Correo no válido"),
  dniRuc: z
    .string()
    .trim()
    .refine((v) => v === "" || /^(\d{8}|\d{11})$/.test(v), "DNI de 8 dígitos o RUC de 11 dígitos"),
  address: z.string().trim().max(300, "Máximo 300 caracteres"),
  district: z.string().trim().max(100, "Máximo 100 caracteres"),
});

export const lineSchema = z.object({
  ambiente: z.string().trim().max(80, "Máximo 80 caracteres"),
  width: z
    .number({ error: "Ingrese el ancho" })
    .min(QUOTE_LIMITS.minSide, `El ancho mínimo es ${QUOTE_LIMITS.minSide} m`)
    .max(QUOTE_LIMITS.maxWidth, `El ancho máximo es ${QUOTE_LIMITS.maxWidth} m`),
  height: z
    .number({ error: "Ingrese el alto" })
    .min(QUOTE_LIMITS.minSide, `El alto mínimo es ${QUOTE_LIMITS.minSide} m`)
    .max(QUOTE_LIMITS.maxHeight, `El alto máximo es ${QUOTE_LIMITS.maxHeight} m`),
});

export type FieldErrors = Record<string, string>;

function issuesToErrors(issues: readonly { path: PropertyKey[]; message: string }[]): FieldErrors {
  const errors: FieldErrors = {};
  for (const issue of issues) {
    const key = String(issue.path[0] ?? "");
    if (key && !errors[key]) errors[key] = issue.message;
  }
  return errors;
}

export function validateCustomer(customer: unknown): FieldErrors {
  const result = customerSchema.safeParse(customer);
  return result.success ? {} : issuesToErrors(result.error.issues);
}

/** Errores por línea, indexados por `id` de la línea. */
export function validateLines(lines: { id: string; ambiente: string; width: number; height: number }[]): Record<string, FieldErrors> {
  const out: Record<string, FieldErrors> = {};
  for (const line of lines) {
    const result = lineSchema.safeParse(line);
    if (!result.success) out[line.id] = issuesToErrors(result.error.issues);
  }
  return out;
}

/** Teléfono normalizado para guardar/enviar (sin espacios ni signos). */
export const normalizePhone = phoneDigits;

const MOBILE_RE = /^(51)?9\d{8}$/;

/** Celular peruano de 9 dígitos, sin prefijo 51 (para guardar y buscar por teléfono). */
export const normalizeMobile = (v: string): string => {
  const digits = phoneDigits(v);
  return MOBILE_RE.test(digits) && digits.length === 11 ? digits.slice(2) : digits;
};

/** Cierre del cotizador nuevo: solo nombre, celular y aceptación de datos personales. */
export const quickCustomerSchema = z.object({
  fullName: z.string().trim().min(3, QUOTE_TEXTS.closing.errors.name).max(200, "Máximo 200 caracteres"),
  phone: z
    .string()
    .trim()
    .refine((v) => MOBILE_RE.test(phoneDigits(v)), QUOTE_TEXTS.closing.errors.phone),
  acceptsPrivacy: z.literal(true, { error: QUOTE_TEXTS.closing.errors.acceptance }),
});

export type QuickCustomer = z.infer<typeof quickCustomerSchema>;

export function validateQuickCustomer(input: unknown): FieldErrors {
  const result = quickCustomerSchema.safeParse(input);
  return result.success ? {} : issuesToErrors(result.error.issues);
}
