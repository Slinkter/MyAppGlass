import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./utils/scroll-to-top";
import { Layout } from "./layout/MainLayout";
import LoadingFallback from "./components/common/LoadingFallback";

/**
 * @component
 * @description Componente principal de la aplicación. Actúa como el layout base
 * que envuelve todas las rutas.
 *
 * IMPORTANTE:
 * Se envuelve el `<Outlet />` en un `<Suspense>` para manejar la carga de
 * componentes "Lazy Loaded" (cargados bajo demanda) definidos en el router.
 * Sin esto, React lanzará un error al intentar suspender la renderización mientras
 * descarga el código de la nueva ruta.
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
