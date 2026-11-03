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

    trackSeoEvent("page_view", {
      page_path: pathname,
      page_location: window.location.href,
      page_title: document.title,
    });
  }, [pathname]);

  return null;
}
