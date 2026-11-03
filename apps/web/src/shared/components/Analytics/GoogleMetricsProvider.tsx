"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import { env } from "@/shared/config/env";
import { trackSeoEvent } from "@/shared/lib/analytics";

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[];
  }
}

const GTM_SCRIPT_ID = "gya-gtm-script";

export default function GoogleMetricsProvider() {
  const pathname = usePathname();

  useEffect(() => {
    const gtmId = env.NEXT_PUBLIC_GTM_ID?.trim();
    if (!gtmId || typeof document === "undefined") {
      return;
    }

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
  }, []);

  useEffect(() => {
    if (!pathname || typeof window === "undefined") {
      return;
    }

    const timer = window.setTimeout(() => {
      const pageTitle = document.title;
      const pageLocation = window.location.href;

      trackSeoEvent("page_view", {
        page_path: pathname,
        page_location: pageLocation,
        page_title: pageTitle,
      });

      if (Array.isArray(window.dataLayer)) {
        window.dataLayer.push({
          event: "virtual_page_view",
          page_path: pathname,
          page_location: pageLocation,
          page_title: pageTitle,
        });
      }
    }, 0);

    return () => window.clearTimeout(timer);
  }, [pathname]);

  return null;
}
