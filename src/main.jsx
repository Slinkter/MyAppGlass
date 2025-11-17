import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { ChakraProvider } from "@chakra-ui/react";
import { ColorModeScript } from "@chakra-ui/react";
import { RouterProvider } from "react-router-dom";
import { Spinner, Center } from "@chakra-ui/react";

import { router } from "./routes";
import theme from "./config/theme";
import "./styles/global.css";
import ColorModeManager from "./components/common/ColorModeManager";

// El fallback de Suspense se mostrará mientras se carga el código del componente diferido.
const suspenseFallback = (
    <Center h="100vh">
        <Spinner size="xl" />
    </Center>
);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <HelmetProvider>
            <ChakraProvider theme={theme}>
                <ColorModeManager />
                <ColorModeScript
                    initialColorMode={theme.config.initialColorMode}
                />
                <React.Suspense fallback={suspenseFallback}>
                    <RouterProvider router={router} />
                </React.Suspense>
            </ChakraProvider>
        </HelmetProvider>
    </React.StrictMode>
);
