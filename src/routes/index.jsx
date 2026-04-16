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
import AuraContainer from "@shared/components/aura/AuraContainer";

// Views
const HomePage = lazy(() => import("@/pages/HomePage"));
const ServicePage = lazy(() => import("@/pages/ServicePage"));
const ProjectPage = lazy(() => import("@/pages/ProjectPage"));
const ProjectDetailPage = lazy(() => import("@/pages/ProjectDetailPage"));
const TestPage = lazy(() => import("@/pages/TestPage"));
const BankAccountsTestPage = lazy(() => import("@/pages/BankAccountsTestPage"));
const ServicesTestPage = lazy(() => import("@/pages/ServicesTestPage"));
const ServiceDetailTestPage = lazy(() => import("@/pages/ServiceDetailTestPage"));
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

import { 
    ProjectPageSkeleton, 
    ServicePageSkeleton, 
    AuraHeaderSkeleton 
} from "@shared/components/aura/AuraSkeleton";

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
                        { 
                            index: true, 
                            element: (
                                <Suspense fallback={<ServicePageSkeleton />}>
                                    <ServiceList />
                                </Suspense>
                            ) 
                        },
                        ...serviceRoutes,
                    ],
                },
                { 
                    path: "proyectos", 
                    element: (
                        <Suspense fallback={<ProjectPageSkeleton />}>
                            <ProjectPage />
                        </Suspense>
                    ) 
                },
                { 
                    path: "proyectos/:projectId", 
                    element: (
                        <Suspense fallback={<AuraContainer><AuraHeaderSkeleton /></AuraContainer>}>
                            <ProjectDetailPage />
                        </Suspense>
                    ) 
                },
                { path: "libro-de-reclamacion", element: <ReclamationForm /> },
                { path: "politicas-empresa", element: <CompanyPoliciesPage /> },
                { path: "cuentas-bancarias", element: <BankAccountsPage /> },
                { path: "test", element: <TestPage /> },
                { path: "test-banca", element: <BankAccountsTestPage /> },
                { path: "test-servicios", element: <ServicesTestPage /> },
                { path: "test-detalle-servicio", element: <ServiceDetailTestPage /> },
            ],
        },
    ],
    {
        future: {
            v7_startTransition: true,
        },
    },
);
