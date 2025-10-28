import React from "react";
import { Suspense } from "react";
import Layout from "./layout/Layout";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./utils/scroll-to-top";
import LoadingFallback from "./components/common/LoadingFallback";

/**
 * @component
 * @description Componente principal de la aplicación. Actúa como el layout base
 * que envuelve todas las rutas, proporcionando elementos comunes como la barra de navegación,
 * el pie de página y la funcionalidad de scroll al inicio de la página.
 * También gestiona el fallback de carga para componentes cargados de forma perezosa (lazy-loaded).
 * @returns {JSX.Element} El componente raíz de la aplicación con el layout y el enrutamiento principal.
 */
function App() {
    return (
        <>
            <ScrollToTop />
            <Layout>
                <Suspense fallback={<LoadingFallback />}>
                    <Outlet />
                </Suspense>
            </Layout>
        </>
    );
}

export default App;
