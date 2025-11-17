import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import ServiceList from "../components/services/ServiceList"; // New import
import { serviceRoutes } from "./serviceRoutes";
import App from "../App";

// Views
const HomePage = lazy(() => import("../pages/HomePage"));
const ServicePage = lazy(() => import("../pages/ServicePage"));
const ProjectPage = lazy(() => import("../pages/ProjectPage"));
const TestPage = lazy(() => import("../pages/TestPage"));
const ReclamationForm = lazy(() =>
    import("../layout/reclamation-book/ReclamationForm")
);
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
                element: <ServicePage />,
                children: [
                    { index: true, element: <ServiceList /> },
                    ...serviceRoutes,
                ],
            },
            { path: "proyectos", element: <ProjectPage /> },
            { path: "libro-de-reclamacion", element: <ReclamationForm /> },
            { path: "test", element: <TestPage /> },
        ],
    },
]);
