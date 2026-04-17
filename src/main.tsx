/**
 * @file main.tsx
 * @description Application entry point that initializes React, Chakra UI, and the routing system.
 * @module entry
 */

import React from "react";
import ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "./components/ui/provider";
import { system } from "./theme";
import { router } from "./routes";
import "./styles/global.css";
import reportWebVitals from "./utils/webVitals";

// El fallback de Suspense se mostrará mientras se carga el código del componente diferido.
const suspenseFallback = (
    <div
        style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
        }}
    >
        {/* Usaremos un div simple mientras migramos el Spinner */}
        Cargando...
    </div>
);

const rootElement = document.getElementById("root");

if (!rootElement) {
    throw new Error("Failed to find the root element");
}

/**
 * Punto de entrada principal de la aplicación React.
 */
ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <HelmetProvider>
            <Provider value={system}>
                {/*  <DevErrorOverlay /> */}
                <RouterProvider
                    router={router}
                    fallbackElement={suspenseFallback}
                    future={{ v7_startTransition: true }}
                />
            </Provider>
        </HelmetProvider>
    </React.StrictMode>,
);

// Performance monitoring
if (import.meta.env.PROD) {
    import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(reportWebVitals);
        getFID(reportWebVitals);
        getFCP(reportWebVitals);
        getLCP(reportWebVitals);
        getTTFB(reportWebVitals);
    });
}
