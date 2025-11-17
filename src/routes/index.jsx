import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
// import ServiceList from "../components/services/ServiceList"; // Removed
// import { serviceRoutes } from "./serviceRoutes"; // Removed
import App from "../App";

// Views
const HomePage = lazy(() => import("../pages/HomePage"));
const ServicePage = lazy(() => import("../pages/ServicePage"));
const ProjectPage = lazy(() => import("../pages/ProjectPage"));
const TestPage = lazy(() => import("../pages/TestPage"));
const ReclamationForm = lazy(() =>
    import("../layout/reclamation-book/ReclamationForm")
);
const CompanyPoliciesPage = lazy(() => import("../pages/CompanyPoliciesPage")); // New import
const BankAccountsPage = lazy(() => import("../pages/BankAccountsPage")); // New import
import ErrorPage from "../pages/ErrorPage";

// Service Pages

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <HomePage /> },
            {
                path: "servicios",
                element: <ServicePage />, // ServicePage now directly renders ServiceList
            },
            { path: "proyectos", element: <ProjectPage /> },
            { path: "libro-de-reclamacion", element: <ReclamationForm /> },
            { path: "politicas-empresa", element: <CompanyPoliciesPage /> }, // New route
            { path: "cuentas-bancarias", element: <BankAccountsPage /> }, // New route
            { path: "test", element: <TestPage /> },
        ],
    },
]);
