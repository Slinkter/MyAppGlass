/**
 * @file seedSystems.ts
 * @description Carga inicial de sistemas a partir de los estudios de catálogos de
 * proveedores (`docs/claude/specs/dashboard-proveedores/sistemas-*.md`). Crea solo
 * los que todavía no existen y todos entran como borrador: el dueño publica o elimina.
 * @module entities/system/api
 */

import type { CatalogSystem } from "../model";
import { SYSTEMS_ALUMINIO } from "../data/systemsAluminio";
import { SYSTEMS_OTROS } from "../data/systemsOtros";
import { SYSTEMS_TEMPLADO_ACERO } from "../data/systemsTempladoAcero";
import { createIfMissing } from "./systemsRepository";

/** Sistemas propuestos por los estudios de catálogos. */
export const SEED_SYSTEMS: CatalogSystem[] = [
  ...SYSTEMS_ALUMINIO,
  ...SYSTEMS_TEMPLADO_ACERO,
  ...SYSTEMS_OTROS,
];

/** Crea los sistemas que falten. Nunca sobrescribe ni republica uno existente. */
export async function seedSystems(): Promise<{ created: number; skipped: number }> {
  let created = 0;
  let skipped = 0;
  for (const { id, ...data } of SEED_SYSTEMS) {
    const wasCreated = await createIfMissing(id, { ...data, estado: "borrador" });
    if (wasCreated) created++;
    else skipped++;
  }
  return { created, skipped };
}
