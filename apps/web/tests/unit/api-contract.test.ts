import { describe, it, expect } from 'vitest';
import { readFileSync } from 'node:fs';
import path from 'node:path';
import { z } from 'zod';
import { reclamationFormSchema } from '@/shared/schemas/reclamation-schema';

/**
 * Contrato frontend <-> backend del Libro de Reclamaciones.
 * La fuente es `docs/api/openapi.json` (generado desde los schemas Zod del backend con
 * `pnpm run contract:generate`). Si este test falla, el frontend se desalineó del backend:
 * ajusta `packages/shared/src/schemas/reclamation-schema.ts` al contrato.
 */

type JsonSchema = {
  type?: string | string[];
  enum?: string[];
  const?: unknown;
  minLength?: number;
  maxLength?: number;
  pattern?: string;
  properties?: Record<string, JsonSchema>;
  required?: string[];
};

const openApiPath = path.resolve(import.meta.dirname, '../../../../docs/api/openapi.json');
const openApi = JSON.parse(readFileSync(openApiPath, 'utf8')) as {
  components: { schemas: Record<string, JsonSchema> };
};
const backend = openApi.components.schemas.ReclamoRequest;

const frontend = z.toJSONSchema(reclamationFormSchema, {
  io: 'input',
  target: 'draft-2020-12',
  unrepresentable: 'any',
}) as JsonSchema;

/** Campos de seguridad/antibot: el backend los lee fuera del schema de negocio (no se comparan). */
const SECURITY_FIELDS = new Set(['mathToken', 'mathAnswer', 'recaptchaToken', '_ts', 'middleName', 'website_hp']);

const businessFields = Object.keys(backend.properties ?? {}).filter((key) => !SECURITY_FIELDS.has(key));

describe('Contrato API: Libro de Reclamaciones (frontend vs openapi.json)', () => {
  it('el frontend define todos los campos de negocio del backend', () => {
    const missing = businessFields.filter((key) => !(key in (frontend.properties ?? {})));
    expect(missing).toEqual([]);
  });

  it('el frontend no envía campos de negocio que el backend desconoce', () => {
    const known = new Set([...businessFields, ...SECURITY_FIELDS]);
    const extra = Object.keys(frontend.properties ?? {}).filter((key) => !known.has(key));
    expect(extra).toEqual([]);
  });

  it('los campos obligatorios del backend también son obligatorios en el frontend', () => {
    const frontendRequired = new Set(frontend.required ?? []);
    const missing = (backend.required ?? [])
      .filter((key) => !SECURITY_FIELDS.has(key))
      .filter((key) => !frontendRequired.has(key));
    expect(missing).toEqual([]);
  });

  it.each(businessFields)('%s: mismos límites (minLength, maxLength, pattern, const)', (field) => {
    const be = backend.properties?.[field] ?? {};
    const fe = frontend.properties?.[field] ?? {};
    const pick = (s: JsonSchema) => ({
      minLength: s.minLength,
      maxLength: s.maxLength,
      pattern: s.pattern,
      const: s.const,
    });
    expect(pick(fe)).toEqual(pick(be));
  });

  it.each(['tipoDocumento', 'tipoBien', 'tipoSolicitud'])(
    '%s: los valores del formulario están aceptados por el backend',
    (field) => {
      const allowed = new Set(backend.properties?.[field]?.enum ?? []);
      const offered = frontend.properties?.[field]?.enum ?? [];
      expect(offered.length).toBeGreaterThan(0);
      expect(offered.filter((value) => !allowed.has(value))).toEqual([]);
    },
  );

  it('un pedido de 9 caracteres se rechaza en ambos lados (límite mínimo del backend)', () => {
    const minPedido = backend.properties?.pedido?.minLength ?? 0;
    const tooShort = 'x'.repeat(minPedido - 1);
    const result = reclamationFormSchema.shape.pedido.safeParse(tooShort);
    expect(result.success).toBe(false);
  });
});
