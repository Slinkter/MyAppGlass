/**
 * @file main.tsx
 * @description Application entry point that initializes React, Chakra UI, and the routing system.
 * @module entry
 */

import React from "react";
import ReactDOM from "react-dom/client";
import { HelmetProvider } from "react-helmet-async";
import { Provider } from "./components/ui/provider";
import { system } from "./theme";
import "./styles/global.css";
import reportWebVitals from "./utils/webVitals";

const rootElement = document.getElementById("root");

if (!rootElement) {
    throw new Error("Failed to find the root element");
}

ReactDOM.createRoot(rootElement).render(
    <React.StrictMode>
        <HelmetProvider>
            <Provider value={system}>
              {/* App logic migrated to App Router */}
            </Provider>
        </HelmetProvider>
    </React.StrictMode>,
);

if (import.meta.env.PROD) {
    import("web-vitals").then(({ getCLS, getFID, getFCP, getLCP, getTTFB }) => {
        getCLS(reportWebVitals);
        getFID(reportWebVitals);
        getFCP(reportWebVitals);
        getLCP(reportWebVitals);
        getTTFB(reportWebVitals);
    });
}
