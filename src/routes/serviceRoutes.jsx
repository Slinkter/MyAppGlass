import { lazy } from "react";

// Service Pages
const VentanaPage = lazy(() =>
    import("../components/services/service-pages/VentanaPage")
);
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

export const serviceRoutes = [
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
];
