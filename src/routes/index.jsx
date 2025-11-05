import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import ServiceList from "../components/services/ServiceList"; // New import

// Views
const HomePage = lazy(() => import("../pages/HomePage"));
const ServicePage = lazy(() => import("../pages/ServicePage"));
const ProjectPage = lazy(() => import("../pages/ProjectPage"));
const TestPage = lazy(() => import("../pages/TestPage"));
import ErrorPage from "../pages/ErrorPage";

// Service Pages

import { serviceRoutes } from "./serviceRoutes";

const ReclamationForm = lazy(() =>
    import("../layout/reclamation-book/ReclamationForm")
);

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { path: "/", element: <HomePage /> },
            {
                path: "/servicios",
                element: <ServicePage />,
                children: [
                    { index: true, element: <ServiceList /> }, // Index route for ServiceList
                    ...serviceRoutes,
                ],
            },
            { path: "/proyectos", element: <ProjectPage /> },
            { path: "/libro-de-reclamacion", element: <ReclamationForm /> },
            { path: "/test", element: <TestPage /> },
            { path: "*", element: <ErrorPage /> },
        ],
    },
]);
