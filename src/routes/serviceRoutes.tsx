/**
 * @file serviceRoutes.tsx
 * @description Dynamic route definitions for individual service pages.
 * @module routes
 */

import { lazy } from "react";
import type { RouteObject } from "react-router-dom";

const ServicePageContainer = lazy(
  () => import("@features/services/components/ServicePageContainer"),
);

export const serviceRoutes: RouteObject[] = [
  { path: ":serviceSlug", element: <ServicePageContainer /> },
];
