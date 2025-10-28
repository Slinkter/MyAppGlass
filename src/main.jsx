import { lazy } from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
// Views
const HomeView = lazy(() => import("./routes/HomeView"));
const ServiceView = lazy(() => import("./routes/ServiceView"));
const ErrorView = lazy(() => import("./routes/ErrorView"));
const TestView = lazy(() => import("./routes/TestView"));
const ProjectView = lazy(() => import("./routes/ProjectView"));
// Service Pages
const Ventana = lazy(() => import("./components/ServicePage/1-Ventana/Ventana"));
const Mampara = lazy(() => import("./components/ServicePage/2-Mampara/Mampara"));
const Ducha = lazy(() => import("./components/ServicePage/3-Ducha/Ducha"));
const Parapeto = lazy(() => import("./components/ServicePage/4-Parapeto/Parapeto"));
const Baranda = lazy(() => import("./components/ServicePage/5-Baranda/Baranda"));
const Balcon = lazy(() => import("./components/ServicePage/6-Balcon/Balcon"));
const Techo = lazy(() => import("./components/ServicePage/7-Techo/Techo"));
const Pvidrio = lazy(() => import("./components/ServicePage/8-PVidrio/Pvidrio"));
const Pserie = lazy(() => import("./components/ServicePage/9-PSerie/Pserie"));
const Celosias = lazy(() => import("./components/ServicePage/10-Celosias/Celosias"));
const ReclamoForm = lazy(() => import("./layout/LibroReclamacion/ReclamoForm"));
//
import theme from "./theme";
import "./index.css";

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            { path: "/", element: <HomeView /> },
            { path: "/servicios", element: <ServiceView /> },
            { path: "/servicios/ventana", element: <Ventana /> },
            { path: "/servicios/mampara", element: <Mampara /> },
            { path: "/servicios/ducha", element: <Ducha /> },
            { path: "/servicios/parapeto", element: <Parapeto /> },
            { path: "/servicios/baranda", element: <Baranda /> },
            { path: "/servicios/balcones", element: <Balcon /> },
            { path: "/servicios/techo", element: <Techo /> },
            { path: "/servicios/pvidrio", element: <Pvidrio /> },
            { path: "/servicios/pserie", element: <Pserie /> },
            { path: "/servicios/celosias", element: <Celosias /> },
            { path: "/proyectos", element: <ProjectView /> },
            { path: "/libro-de-reclamacion", element: <ReclamoForm /> },
            { path: "/test", element: <TestView /> },
            { path: "*", element: <ErrorView /> },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <HelmetProvider>
        <ChakraProvider theme={theme}>
            <ColorModeScript initialColorMode={theme.config.initialColorMode} />
            <RouterProvider router={router} />
        </ChakraProvider>
    </HelmetProvider>
);
