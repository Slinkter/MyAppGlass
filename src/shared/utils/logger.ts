/**
 * @file logger.ts
 * @description High-performance logging utility using Pino.
 */
import pino from 'pino';

const isProd = process.env.NODE_ENV === "production";

// Configuración de Pino
const pinoLogger = pino({
  level: isProd ? 'info' : 'debug',
  browser: {
    asObject: true,
  },
  base: {
    env: process.env.NODE_ENV,
    version: '1.0.0',
  },
});

export const logger = {
  error: (message: string, error?: unknown, context?: Record<string, unknown>) => {
    pinoLogger.error({
      err: error instanceof Error ? { message: error.message, stack: error.stack } : error,
      ...context,
      timestamp: new Date().toISOString(),
      url: typeof window !== "undefined" ? window.location.href : "server-side"
    }, `[GYA-ERROR] ${message}`);
  },
  
  info: (messageOrData: string | Record<string, unknown>, data?: unknown) => {
    if (typeof messageOrData === 'string') {
      pinoLogger.info({ data }, `[GYA-INFO] ${messageOrData}`);
    } else {
      pinoLogger.info(messageOrData, '[GYA-INFO]');
    }
  },

  warn: (messageOrData: string | Record<string, unknown>, data?: unknown) => {
    if (typeof messageOrData === 'string') {
      pinoLogger.warn({ data }, `[GYA-WARN] ${messageOrData}`);
    } else {
      pinoLogger.warn(messageOrData, '[GYA-WARN]');
    }
  },

  debug: (messageOrData: string | Record<string, unknown>, data?: unknown) => {
    if (!isProd) {
      if (typeof messageOrData === 'string') {
        pinoLogger.debug({ data }, `[GYA-DEBUG] ${messageOrData}`);
      } else {
        pinoLogger.debug(messageOrData, '[GYA-DEBUG]');
      }
    }
  }
};

export default logger;
