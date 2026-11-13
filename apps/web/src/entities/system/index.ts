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
