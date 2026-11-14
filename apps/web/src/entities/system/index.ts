/**
 * @file index.ts
 * @description API pública de la entidad Sistema (catálogo de ventanas y sus componentes).
 * @module entities/system
 */

// Model
export type {
  CatalogSystem,
  CatalogSystemInput,
  PublicSystem,
  SystemAccessory,
  SystemAlias,
  SystemOpening,
  SystemStatus,
} from "./model";

// API
export {
  listenAll,
  getPublishedByService,
  createIfMissing,
  setStatus,
  remove,
} from "./api/systemsRepository";
export { useSystems } from "./api/useSystems";
export type { UseSystemsResult } from "./api/useSystems";
export { seedSystems, SEED_SYSTEMS } from "./api/seedSystems";
export { usePublishedSystems } from "./api/usePublishedSystems";

// UI
export { SystemArchitecturalSvg } from "./ui/SystemArchitecturalSvg";
export type { SystemArchitecturalSvgProps } from "./ui/SystemArchitecturalSvg";
export { resolveSystemRenderUrl } from "./ui/systemRenders";
export {
  ALUMINUM_FINISHES,
  GLASS_TINTS,
  archetypeSupportsAluminumFinish,
  resolveSystemSvgArchetype,
} from "./ui/svgPresets";
export type {
  AluminumFinishId,
  FinishSwatch,
  GlassTintId,
  GlassTintOption,
  SystemSvgArchetype,
} from "./ui/svgPresets";
