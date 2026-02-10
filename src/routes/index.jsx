/**
 * @file index.jsx
 * @description Main router configuration for the application using `react-router-dom`'s data loader API.
 * @module routes
 */

import { lazy, Suspense } from "react";
import { createBrowserRouter } from "react-router-dom";
import { serviceRoutes } from "@/routes/serviceRoutes";
import ErrorFallback from "@shared/components/common/ErrorFallback";
import App from "@/App";

// Views
const HomePage = lazy(() => import("@/pages/HomePage"));
const ServicePage = lazy(() => import("@/pages/ServicePage"));
const ProjectPage = lazy(() => import("@/pages/ProjectPage"));
const TestPage = lazy(() => import("@/pages/TestPage"));
const CompanyPoliciesPage = lazy(() => import("@/pages/CompanyPoliciesPage"));
const BankAccountsPage = lazy(() => import("@/pages/BankAccountsPage"));
const ServiceList = lazy(() =>
  import("@features/services").then((module) => ({
    default: module.ServiceList,
  })),
);
const ReclamationForm = lazy(() =>
  import("@features/reclamation-book").then((module) => ({
    default: module.ReclamationForm,
  })),
);

// ErrorPage Loading Fallback - Logic moved to ErrorFallback.jsx

const ErrorPage = lazy(() => import("@/pages/ErrorPage"));

export const router = createBrowserRouter(
  [
    {
      path: "/",
      element: <App />,
      errorElement: (
        <Suspense fallback={<ErrorFallback />}>
          <ErrorPage />
        </Suspense>
      ),
      children: [
        { index: true, element: <HomePage /> },
        {
          path: "servicios",
          element: <ServicePage />,
          children: [
            { index: true, element: <ServiceList /> }, // Render ServiceList at /servicios
            ...serviceRoutes,
          ],
        },
        { path: "proyectos", element: <ProjectPage /> },
        { path: "libro-de-reclamacion", element: <ReclamationForm /> },
        { path: "politicas-empresa", element: <CompanyPoliciesPage /> },
        { path: "cuentas-bancarias", element: <BankAccountsPage /> },
        { path: "test", element: <TestPage /> },
      ],
    },
  ],
  {
    future: {
      v7_startTransition: true,
    },
  },
);
