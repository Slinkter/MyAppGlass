/**
 * @file index.js
 * @description Public API for the Services feature module.
 * @module services
 */

// Components
export { default as ServiceCard } from "./components/ServiceCard";
export { default as ServiceList } from "./components/ServiceList";
export { default as ServiceListSkeleton } from "./components/ServiceListSkeleton";

export { default as ServiceSkeleton } from "./components/ServiceSkeleton";
export { default as SpecItem } from "./components/SpecItem";

// Services
export * from "./services/serviceService"; // Export all from serviceService.js
