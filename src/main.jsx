import React from "react";
import ReactDOM from "react-dom/client";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { HelmetProvider } from "react-helmet-async";
import { RouterProvider } from "react-router-dom";
import { Provider } from "react-redux";
import { Spinner, Center } from "@chakra-ui/react"; // Para el fallback de Suspense
import { store } from "./app/store";
import { router } from "./routes";

import theme from "./config/theme";
import "./styles/global.css";

// El fallback de Suspense se mostrará mientras se carga el código del componente diferido.
const suspenseFallback = (
    <Center h="100vh">
        <Spinner size="xl" />
    </Center>
);

ReactDOM.createRoot(document.getElementById("root")).render(
    <React.StrictMode>
        <Provider store={store}>
            <HelmetProvider>
                <ChakraProvider theme={theme}>
                    <ColorModeScript
                        initialColorMode={theme.config.initialColorMode}
                    />
                    <React.Suspense fallback={suspenseFallback}>
                        <RouterProvider router={router} />
                    </React.Suspense>
                </ChakraProvider>
            </HelmetProvider>
        </Provider>
    </React.StrictMode>
);
