import { getAnalytics, isSupported, logEvent, type Analytics } from "firebase/analytics";
import { env } from "@/shared/config/env";
import app from "@/shared/lib/firebase";

let analyticsPromise: Promise<Analytics | null> | null = null;

/**
 * Inicializa Google Analytics 4 / Firebase Analytics de forma asíncrona en cliente.
 * Se desactiva en SSR, cuando se usan emuladores locales o sin measurementId.
 */
export function initGoogleAnalytics(): Promise<Analytics | null> {
  if (typeof window === "undefined") {
    return Promise.resolve(null);
  }

  if (
    env.NEXT_PUBLIC_USE_EMULATORS === "true" ||
    !env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
  ) {
    return Promise.resolve(null);
  }

  if (!analyticsPromise) {
    analyticsPromise = isSupported()
      .then((supported) => (supported ? getAnalytics(app) : null))
      .catch(() => null);
  }

  return analyticsPromise;
}

/**
 * Envía un evento de analítica SEO / GA4 de forma segura y no bloqueante.
 */
export function trackSeoEvent(
  eventName: string,
  params?: Record<string, string | number | boolean>
): void {
  if (typeof window === "undefined") {
    return;
  }

  void initGoogleAnalytics()
    .then((analytics) => {
      if (analytics) {
        logEvent(analytics, eventName, params);
      }
    })
    .catch(() => undefined);
}
