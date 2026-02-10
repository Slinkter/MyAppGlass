import { lazy } from "react";
const ServicePageContainer = lazy(
  () => import("@features/services/components/ServicePageContainer"),
);

export const serviceRoutes = [
  { path: ":serviceSlug", element: <ServicePageContainer /> },
];
