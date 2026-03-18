/**
 * @file scroll-to-top.js
 * @description React component that resets the window scroll position to the top on route transitions.
 * @module utils/navigation
 */

import { useLocation } from "react-router-dom";
import { useEffect } from "react";

/**
 * @component ScrollToTop
 * @description A utility component that scrolls the window to the top (0, 0) whenever the route path changes.
 * @remarks
 * This component does not render any visual UI (`return null`). It relies on `useLocation` and `useEffect`
 * to trigger the scroll reset side effect.
 * @returns {null} This component renders nothing.
 */
const ScrollToTop = () => {
  const { pathname, key } = useLocation();
  
  useEffect(() => {
    // Intenta múltiples métodos de scroll para asegurar compatibilidad total (Cross-browser)
    try {
      window.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.documentElement.scrollTo({ top: 0, left: 0, behavior: "instant" });
      document.body.scrollTo({ top: 0, left: 0, behavior: "instant" });
    } catch (e) {
      // Fallback para navegadores antiguos
      window.scrollTo(0, 0);
    }
  }, [pathname, key]);

  return null;
};

export default ScrollToTop;
