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
            { path: "/", element: <HomePage /> },
            { path: "/servicios", element: <ServicePage /> },
            { path: "/servicios/ventana", element: <VentanaPage /> },
            { path: "/servicios/mampara", element: <MamparaPage /> },
            { path: "/servicios/ducha", element: <DuchaPage /> },
            { path: "/servicios/parapeto", element: <ParapetoPage /> },
            { path: "/servicios/baranda", element: <BarandaPage /> },
            { path: "/servicios/balcones", element: <BalconPage /> },
            { path: "/servicios/techo", element: <TechoPage /> },
            { path: "/servicios/pvidrio", element: <PvidrioPage /> },
            { path: "/servicios/pserie", element: <PseriePage /> },
            { path: "/servicios/celosias", element: <CelosiasPage /> },
            { path: "/proyectos", element: <ProjectPage /> },
            { path: "/libro-de-reclamacion", element: <ReclamationForm /> },
            { path: "/test", element: <TestPage /> },
            { path: "*", element: <ErrorPage /> },
        ],
    },
]);
