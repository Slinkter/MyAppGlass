/**
 * @file index.ts
 * @description Modelo del presupuesto formal (PRES-0001). Los tipos y el contrato vienen de
 * `@gya/shared`: son los mismos que validan las Cloud Functions.
 * @module entities/budget/model
 */

export {
  presupuestoSchema,
  guardarPresupuestoInputSchema,
  unidadSchema,
  UNIDAD_LABELS,
  ESTADO_PRESUPUESTO_LABELS,
  TRANSICIONES_PRESUPUESTO,
  puedeCambiarEstado,
  VALIDEZ_DIAS_DEFECTO,
  MAX_ITEMS_PRESUPUESTO,
  IGV_RATE,
  calcularTotales,
} from "@/shared/schemas/presupuesto-schema";

export type {
  Presupuesto,
  PresupuestoItem,
  PresupuestoItemInput,
  PresupuestoCliente,
  EstadoPresupuesto,
  Unidad,
  GuardarPresupuestoInput,
  GuardarPresupuestoOutput,
  CambiarEstadoInput,
  CambiarEstadoOutput,
  GenerarPdfOutput,
  TotalesPresupuesto,
} from "@/shared/schemas/presupuesto-schema";
