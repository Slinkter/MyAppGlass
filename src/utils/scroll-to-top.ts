/**
 * @file scroll-to-top.ts
 * @description React component that resets the window scroll position to the top on route transitions.
 * @module utils/navigation
 */

import { usePathname as useLocation } from "next/navigation";
import { useEffect, FC } from "react";

/**
 * @component ScrollToTop
 * @description A utility component that scrolls the window to the top (0, 0) whenever the route path changes.
 * @remarks
 * This component does not render any visual UI (`return null`). It relies on `useLocation` and `useEffect`
 * to trigger the scroll reset side effect.
 * @returns {null} This component renders nothing.
 */
const ScrollToTop: FC = () => {
  const pathname = useLocation();
  
  useEffect(() => {
    // Una sola llamada es suficiente para navegadores modernos
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [pathname]);

  return null;
};

export default ScrollToTop;
