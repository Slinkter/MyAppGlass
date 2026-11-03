import type { Analytics } from "firebase/analytics";
import { env } from "@/shared/config/env";
import app from "@/shared/lib/firebase";

let analyticsPromise: Promise<Analytics | null> | null = null;

/**
 * Determina si el entorno actual es un navegador en producción real.
 * Excluye SSR, entorno de desarrollo (`NODE_ENV !== "production"`), emuladores y `localhost`.
 */
export function isProductionAnalyticsEnabled(): boolean {
  if (typeof window === "undefined") return false;
  if (process.env.NODE_ENV !== "production") return false;
  if (env.NEXT_PUBLIC_USE_EMULATORS === "true") return false;
  if (!env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID) return false;
  const host = window.location.hostname;
  return host !== "localhost" && host !== "127.0.0.1";
}

/**
 * Inicializa Google Analytics 4 / Firebase Analytics (`G-TY0NJP1S81`) mediante `import()` dinámico
 * con `send_page_view: false` para que `GoogleMetricsProvider` sea la única fuente de eventos `page_view`
 * sin duplicados en el primer mount ni peso extra en el bundle inicial.
 */
export function initGoogleAnalytics(): Promise<Analytics | null> {
  if (!isProductionAnalyticsEnabled()) {
    return Promise.resolve(null);
  }

  if (!analyticsPromise) {
    analyticsPromise = import("firebase/analytics")
      .then(async ({ isSupported, initializeAnalytics }) => {
        const supported = await isSupported();
        if (!supported) return null;
        return initializeAnalytics(app, {
          config: {
            send_page_view: false,
          },
        });
      })
      .catch(() => null);
  }

  return analyticsPromise;
}

/**
 * Envía un evento de analítica SEO / GA4 de forma segura, diferida y solo en producción.
 */
export function trackSeoEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
): void {
  if (!isProductionAnalyticsEnabled()) {
    return;
  }

  void Promise.all([initGoogleAnalytics(), import("firebase/analytics")])
    .then(([analytics, { logEvent }]) => {
      if (analytics) {
        logEvent(analytics, eventName, params);
      }
    })
    .catch(() => undefined);
}
