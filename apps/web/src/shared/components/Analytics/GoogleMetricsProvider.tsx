"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { env } from "@/shared/config/env";
import { isProductionAnalyticsEnabled, trackSeoEvent } from "@/shared/lib/analytics";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

const GTM_SCRIPT_ID = "gya-gtm-script";

export default function GoogleMetricsProvider() {
  const pathname = usePathname();

  useEffect(() => {
    if (!isProductionAnalyticsEnabled() || typeof document === "undefined") {
      return;
    }

    const gtmId = env.NEXT_PUBLIC_GTM_ID?.trim();
    if (!gtmId) {
      return;
    }

    const loadGtm = () => {
      if (document.getElementById(GTM_SCRIPT_ID)) {
        return;
      }

      window.dataLayer = window.dataLayer || [];
      window.dataLayer.push({
        "gtm.start": Date.now(),
        event: "gtm.js",
      });

      const script = document.createElement("script");
      script.id = GTM_SCRIPT_ID;
      script.async = true;
      script.src = `https://www.googletagmanager.com/gtm.js?id=${encodeURIComponent(gtmId)}`;
      document.head.appendChild(script);
    };

    let idleId: number | null = null;
    let timeoutId: ReturnType<typeof setTimeout> | null = null;

    if (typeof window !== "undefined" && "requestIdleCallback" in window) {
      idleId = (window as unknown as { requestIdleCallback: (cb: () => void, opts?: { timeout: number }) => number }).requestIdleCallback(
        loadGtm,
        { timeout: 3000 },
      );
    } else {
      timeoutId = setTimeout(loadGtm, 1500);
    }

    return () => {
      if (idleId !== null && typeof window !== "undefined" && "cancelIdleCallback" in window) {
        (window as unknown as { cancelIdleCallback: (id: number) => void }).cancelIdleCallback(idleId);
      }
      if (timeoutId !== null) {
        clearTimeout(timeoutId);
      }
    };
  }, []);

  useEffect(() => {
    if (!pathname || !isProductionAnalyticsEnabled()) {
      return;
    }

    const gtmId = env.NEXT_PUBLIC_GTM_ID?.trim();

    const timer = window.setTimeout(() => {
      const pageTitle = document.title;
      const pageLocation = window.location.href;

      // Si hay un contenedor GTM configurado, delegamos la vista de página a dataLayer
      // para evitar doble medición en caso de que GTM ya contenga una etiqueta GA4.
      if (gtmId) {
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "virtual_page_view",
          page_path: pathname,
          page_location: pageLocation,
          page_title: pageTitle,
        });
        return;
      }

      trackSeoEvent("page_view", {
        page_path: pathname,
        page_location: pageLocation,
        page_title: pageTitle,
      });
    }, 0);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  return null;
}
