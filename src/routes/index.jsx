import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import { serviceRoutes } from "@/routes/serviceRoutes";
import App from "@/App";

// Views
const HomePage = lazy(() => import("@/pages/HomePage"));
const ServicePage = lazy(() => import("@/pages/ServicePage"));
const ProjectPage = lazy(() => import("@/pages/ProjectPage"));
const TestPage = lazy(() => import("@/pages/TestPage"));
const CompanyPoliciesPage = lazy(() => import("@/pages/CompanyPoliciesPage"));
const BankAccountsPage = lazy(() => import("@/pages/BankAccountsPage"));
const ServiceList = lazy(() => import("@/components/services/ServiceList"));
const ReclamationForm = lazy(() =>
    import("@/layout/reclamation-book/ReclamationForm")
);
import ErrorPage from "@/pages/ErrorPage";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
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
]);
