/**
 * @file index.ts
 * @description Public API for the Service entity.
 * @module entities/service
 */

// UI
export { default as ServiceCard } from "./ui/ServiceCard";
export { default as ServiceList } from "./ui/ServiceList";
export { ServiceCardSkeletons, ServiceDetailSkeleton } from "./ui/ServiceSkeletons";

// API
export { useServices, useService } from "./api/useServices";
export {
  SERVICE_SEO_FALLBACKS,
  getServiceSeo,
  toServiceListItem,
  toServicePageData,
} from "./api/serviceMappers";

// Lib
export { getServiceHref } from "./lib/getServiceHref";

// Model
export type {
  Service,
  ServiceFaq,
  ServiceListItem,
  ServicePageData,
  ServicePageFeature,
  ServicePageSEO,
  ServicePageSystem,
} from "./model";
