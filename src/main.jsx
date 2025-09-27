import { lazy, Suspense } from "react";
import ReactDOM from "react-dom/client";
import {
    ChakraProvider,
    ColorModeScript,
    Center,
    Flex,
    Spinner,
} from "@chakra-ui/react";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import theme from "./theme";
import "./index.css";

// Lazy load de las vistas y páginas
const HomeView = lazy(() => import("./routes/HomeView"));
const ServiceView = lazy(() => import("./routes/ServiceView"));
const ProjectView = lazy(() => import("./routes/ProjectView"));
const ErrorView = lazy(() => import("./routes/ErrorView"));
const TestView = lazy(() => import("./routes/TestView"));
const ReclamoForm = lazy(() => import("./layout/LibroReclamacion/ReclamoForm"));

// Lazy load de las páginas de servicio
const Ventana = lazy(() =>
    import("./components/ServicePage/1-Ventana/Ventana")
);
const Mampara = lazy(() =>
    import("./components/ServicePage/2-Mampara/Mampara")
);
const Ducha = lazy(() => import("./components/ServicePage/3-Ducha/Ducha"));
const Parapeto = lazy(() =>
    import("./components/ServicePage/4-Parapeto/Parapeto")
);
const Baranda = lazy(() =>
    import("./components/ServicePage/5-Baranda/Baranda")
);
const Balcon = lazy(() => import("./components/ServicePage/6-Balcon/Balcon"));
const Techo = lazy(() => import("./components/ServicePage/7-Techo/Techo"));
const Pvidrio = lazy(() =>
    import("./components/ServicePage/8-PVidrio/Pvidrio")
);
const Pserie = lazy(() => import("./components/ServicePage/9-PSerie/Pserie"));
const Celosias = lazy(() =>
    import("./components/ServicePage/10-Celosias/Celosias")
);

// Componente de carga para Suspense
const PageLoaderSpinnerLoader = () => (
    <Center h="100dvh">
        <Flex direction="column" align="center" justify="center" gap={4}>
            <Spinner size="xl" />
            <p>Cargando...</p>
        </Flex>
    </Center>
);

const router = createBrowserRouter([
    {
        path: "/",
        element: <App />,
        children: [
            {
                path: "/",
                element: (
                    <Suspense fallback={<PageLoaderSpinnerLoader />}>
                        <HomeView />
                    </Suspense>
                ),
            },
            {
                path: "/servicios",
                element: (
                    <Suspense fallback={<PageLoaderSpinnerLoader />}>
                        <ServiceView />
                    </Suspense>
                ),
            },
            {
                path: "/servicios/ventana",
                element: (
                    <Suspense fallback={<PageLoaderSpinnerLoader />}>
                        <Ventana />
                    </Suspense>
                ),
            },
            {
                path: "/servicios/mampara",
                element: (
                    <Suspense fallback={<PageLoaderSpinnerLoader />}>
                        <Mampara />
                    </Suspense>
                ),
            },
            {
                path: "/servicios/ducha",
                element: (
                    <Suspense fallback={<PageLoaderSpinnerLoader />}>
                        <Ducha />
                    </Suspense>
                ),
            },
            {
                path: "/servicios/parapeto",
                element: (
                    <Suspense fallback={<PageLoaderSpinnerLoader />}>
                        <Parapeto />
                    </Suspense>
                ),
            },
            {
                path: "/servicios/baranda",
                element: (
                    <Suspense fallback={<PageLoaderSpinnerLoader />}>
                        <Baranda />
                    </Suspense>
                ),
            },
            {
                path: "/servicios/balcones",
                element: (
                    <Suspense fallback={<PageLoaderSpinnerLoader />}>
                        <Balcon />
                    </Suspense>
                ),
            },
            {
                path: "/servicios/techo",
                element: (
                    <Suspense fallback={<PageLoaderSpinnerLoader />}>
                        <Techo />
                    </Suspense>
                ),
            },
            {
                path: "/servicios/pvidrio",
                element: (
                    <Suspense fallback={<PageLoaderSpinnerLoader />}>
                        <Pvidrio />
                    </Suspense>
                ),
            },
            {
                path: "/servicios/pserie",
                element: (
                    <Suspense fallback={<PageLoaderSpinnerLoader />}>
                        <Pserie />
                    </Suspense>
                ),
            },
            {
                path: "/servicios/celosias",
                element: (
                    <Suspense fallback={<PageLoaderSpinnerLoader />}>
                        <Celosias />
                    </Suspense>
                ),
            },
            {
                path: "/proyectos",
                element: (
                    <Suspense fallback={<PageLoaderSpinnerLoader />}>
                        <ProjectView />
                    </Suspense>
                ),
            },
            {
                path: "/libro-de-reclamacion",
                element: (
                    <Suspense fallback={<PageLoaderSpinnerLoader />}>
                        <ReclamoForm />
                    </Suspense>
                ),
            },
            {
                path: "/test",
                element: (
                    <Suspense fallback={<PageLoaderSpinnerLoader />}>
                        <TestView />
                    </Suspense>
                ),
            },
            {
                path: "*",
                element: (
                    <Suspense fallback={<PageLoaderSpinnerLoader />}>
                        <ErrorView />
                    </Suspense>
                ),
            },
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
