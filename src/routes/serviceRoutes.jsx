/**
 * @file serviceRoutes.jsx
 * @description Dynamic route definitions for individual service pages.
 * @module routes
 */

import { lazy } from "react";
const ServicePageContainer = lazy(
  () => import("@features/services/components/ServicePageContainer"),
);

export const serviceRoutes = [
  { path: ":serviceSlug", element: <ServicePageContainer /> },
];
