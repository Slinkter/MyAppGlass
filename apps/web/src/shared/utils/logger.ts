/**
 * @file logger.ts
 * @description High-performance logging utility using Pino.
 */
import pino from 'pino';
import { env } from "@/shared/config/env";

const isProd = env.NODE_ENV === "production";

// Pino Configuration
const pinoLogger = pino({
  level: isProd ? 'info' : 'debug',
  browser: {
    asObject: true,
  },
  base: {
    env: env.NODE_ENV,
    version: '1.0.0',
  },
});

export const logger = {
  error: (message: string, error?: unknown, context?: Record<string, unknown>) => {
    const errorDetails =
      error instanceof Error
        ? { message: error.message, stack: error.stack, name: error.name, ...(error as unknown as Record<string, unknown>) }
        : error && typeof error === "object"
          ? JSON.parse(JSON.stringify(error, Object.getOwnPropertyNames(error)))
          : error;

    const errMsg = error instanceof Error ? error.message : typeof error === "string" ? error : "";
    const logTitle = errMsg ? `[GYA-ERROR] ${message}: ${errMsg}` : `[GYA-ERROR] ${message}`;

    pinoLogger.error(
      {
        err: errorDetails,
        ...context,
        timestamp: new Date().toISOString(),
        url: typeof window !== "undefined" ? window.location.href : "server-side",
      },
      logTitle
    );
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
