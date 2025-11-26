import ScrollToTop from "./utils/scroll-to-top";
import Layout from "./layout/Layout";
import { Outlet } from "react-router-dom";

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
                <Outlet />
            </Layout>
        </>
    );
}

export default App;
