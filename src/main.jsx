import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { Spinner, Center } from "@chakra-ui/react";
import darkModeManager from "./config/darkModeManager"; // Import the custom dark mode manager
import { router } from "./routes";
import theme from "./config/theme";
import "./styles/global.css";
import reportWebVitals from "./utils/webVitals";

// El fallback de Suspense se mostrará mientras se carga el código del componente diferido.
// Esto mejora la UX mostrando algo al usuario inmediatamente en lugar de una pantalla blanca.
const suspenseFallback = (
  <Center h="100vh">
    <Spinner size="xl" color="blue.500" />
  </Center>
);

/**
 * Punto de entrada principal de la aplicación React.
 * Aquí se configuran los proveedores globales que envuelven a toda la App.
 */
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ColorModeScript initialColorMode={theme.config.initialColorMode} />
    <HelmetProvider>
      <ChakraProvider theme={theme} colorModeManager={darkModeManager}>
        <RouterProvider router={router} fallbackElement={suspenseFallback} />
      </ChakraProvider>
    </HelmetProvider>
  </React.StrictMode>,
);

// Al final del archivo
if (import.meta.env.PROD) {
  import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
    getCLS(reportWebVitals);
    getFID(reportWebVitals);
    getFCP(reportWebVitals);
    getLCP(reportWebVitals);
    getTTFB(reportWebVitals);
  });
}
