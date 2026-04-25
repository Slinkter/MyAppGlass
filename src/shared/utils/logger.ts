/**
 * @file logger.ts
 * @description Utilidad de logging para capturar errores en producción.
 */

const isProd = process.env.NODE_ENV === "production";

export const logger = {
  error: (message: string, error?: unknown, context?: Record<string, unknown>) => {
    console.error(`[GYA-LOG-ERROR] ${message}`, {
      error: error instanceof Error ? { message: error.message, stack: error.stack } : error,
      context,
      timestamp: new Date().toISOString(),
      url: typeof window !== "undefined" ? window.location.href : "server-side"
    });

    // Aquí podríamos integrar Sentry o una API de logs propia en el futuro
  },
  info: (messageOrData: any, data?: unknown) => {
    if (!isProd) {
      if (typeof messageOrData === 'string') {
        console.log(`[GYA-LOG-INFO] ${messageOrData}`, data);
      } else {
        console.log(`[GYA-LOG-INFO]`, messageOrData, data);
      }
    }
  },
  warn: (messageOrData: any, data?: unknown) => {
    if (typeof messageOrData === 'string') {
      console.warn(`[GYA-LOG-WARN] ${messageOrData}`, data);
    } else {
      console.warn(`[GYA-LOG-WARN]`, messageOrData, data);
    }
  },
  debug: (messageOrData: any, data?: unknown) => {
    if (!isProd) {
      if (typeof messageOrData === 'string') {
        console.debug(`[GYA-LOG-DEBUG] ${messageOrData}`, data);
      } else {
        console.debug(`[GYA-LOG-DEBUG]`, messageOrData, data);
      }
    }
  }
};

export default logger;
