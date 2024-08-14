// src/main.jsx

import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, extendTheme, ColorModeScript } from "@chakra-ui/react";

import { RouterProvider, createBrowserRouter } from "react-router-dom";
import App from "./App";
import HomeView from "./routes/HomeView";
import ServiceView from "./routes/ServiceView";
import ProductView from "./routes/ProductView";
import UsView from "./routes/UsView";
import ErrorView from "./routes/ErrorView";
import TestView from "./routes/TestView";
import ProjectView from "./routes/ProjectView"; //
import theme from "./theme";
import Ventana from "./components/ServicePage/1-Ventana/Ventana";
import Mampara from "./components/ServicePage/2-Mampara/Mampara";
import Ducha from "./components/ServicePage/3-Ducha/Ducha";
import Parapeto from "./components/ServicePage/4-Parapeto/Parapeto";
import Baranda from "./components/ServicePage/5-Baranda/Baranda";
import Balcon from "./components/ServicePage/6-Balcon/Balcon";
import Techo from "./components/ServicePage/7-Techo/Techo";
import Pvidrio from "./components/ServicePage/8-PVidrio/Pvidrio";
import Pserie from "./components/ServicePage/9-PSerie/Pserie";
import Celosias from "./components/ServicePage/10-Celosias/Celosias";
import "./index.css";
import ScrollToTop from "./utils/ScrollToTop";

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
            { path: "/test", element: <TestView /> },
            { path: "*", element: <ErrorView /> },
        ],
    },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
    <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <RouterProvider router={router} />
    </ChakraProvider>
);
