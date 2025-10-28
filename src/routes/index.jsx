import { lazy } from "react";
import { createBrowserRouter } from "react-router-dom";
import App from "../App";

// Views
const HomePage = lazy(() => import("../pages/HomePage"));
const ServicePage = lazy(() => import("../pages/ServicePage"));
import ErrorPage from "../pages/ErrorPage";
const TestPage = lazy(() => import("../pages/TestPage"));
const ProjectPage = lazy(() => import("../pages/ProjectPage"));

// Service Pages
import VentanaPage from "../components/services/service-pages/VentanaPage";
const MamparaPage = lazy(() =>
    import("../components/services/service-pages/MamparaPage")
);
const DuchaPage = lazy(() =>
    import("../components/services/service-pages/DuchaPage")
);
const ParapetoPage = lazy(() =>
    import("../components/services/service-pages/ParapetoPage")
);
const BarandaPage = lazy(() =>
    import("../components/services/service-pages/BarandaPage")
);
const BalconPage = lazy(() =>
    import("../components/services/service-pages/BalconPage")
);
const TechoPage = lazy(() =>
    import("../components/services/service-pages/TechoPage")
);
const PvidrioPage = lazy(() =>
    import("../components/services/service-pages/PvidrioPage")
);
const PseriePage = lazy(() =>
    import("../components/services/service-pages/PseriePage")
);
const CelosiasPage = lazy(() =>
    import("../components/services/service-pages/CelosiasPage")
);
const ReclamationForm = lazy(() =>
    import("../layout/reclamation-book/ReclamationForm")
);

export const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        errorElement: <ErrorPage />,
        children: [
            { index: true, element: <HomePage /> },
            {
                path: "servicios",
                children: [
                    { index: true, element: <ServicePage /> },
                    { path: "ventana", element: <VentanaPage /> },
                    { path: "mampara", element: <MamparaPage /> },
                    { path: "ducha", element: <DuchaPage /> },
                    { path: "parapeto", element: <ParapetoPage /> },
                    { path: "baranda", element: <BarandaPage /> },
                    { path: "balcones", element: <BalconPage /> },
                    { path: "techo", element: <TechoPage /> },
                    { path: "pvidrio", element: <PvidrioPage /> },
                    { path: "pserie", element: <PseriePage /> },
                    { path: "celosias", element: <CelosiasPage /> },
                ],
            },
            { path: "proyectos", element: <ProjectPage /> },
            { path: "libro-de-reclamacion", element: <ReclamationForm /> },
            { path: "test", element: <TestPage /> },
            { path: "*", element: <ErrorPage /> },
        ],
    },
]);
