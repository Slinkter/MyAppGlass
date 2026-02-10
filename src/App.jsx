/**
 * @file App.jsx
 * @description Root component that defines the base structural layout and routing entry point.
 * @module core
 */

import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import ScrollToTop from "./utils/scroll-to-top";
import { Layout } from "./layout/MainLayout";
import LoadingFallback from "@shared/components/common/LoadingFallback";

/**
 * @component App
 * @description Main application container that wraps the entire routing structure.
 * @remarks
 * - Implements a global `ScrollToTop` trigger on route changes.
 * - Wraps the `Outlet` in a `Suspense` boundary to support lazy-loaded route components.
 * - Ensures a consistent layout across all application pages.
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
