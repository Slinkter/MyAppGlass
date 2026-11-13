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
    write: {
      // En navegador, Next.js toma el 1er argumento de console.error como título del overlay;
      // pasar un objeto primero hace que se muestre "{}" en lugar del mensaje real.
      error: (o: object) => {
        const { msg, ...rest } = o as Record<string, unknown>;
        console.error(typeof msg === "string" ? msg : "[GYA-ERROR]", rest);
      },
    },
  },
  base: {
    env: env.NODE_ENV,
    version: '1.0.0',
  },
});

function safeClone(value: unknown): unknown {
  try {
    return structuredClone(value);
  } catch {
    return typeof value === "object" && value !== null ? { ...(value as Record<string, unknown>) } : value;
  }
}

export const logger = {
  error: (message: string, error?: unknown, context?: Record<string, unknown>) => {
    const errCode =
      error && typeof error === "object" && "code" in error && typeof (error as { code?: unknown }).code === "string"
        ? (error as { code: string }).code
        : undefined;

    const errorDetails =
      error instanceof Error
        ? {
            message: error.message,
            stack: error.stack,
            name: error.name,
            ...(errCode ? { code: errCode } : {}),
            ...(error as unknown as Record<string, unknown>),
          }
        : error && typeof error === "object"
          ? safeClone(error)
          : error;

    const errMsg = error instanceof Error ? error.message : typeof error === "string" ? error : "";
    const codePrefix = errCode ? ` (${errCode})` : "";
    const logTitle = errMsg
      ? `[GYA-ERROR] ${message}${codePrefix}: ${errMsg}`
      : `[GYA-ERROR] ${message}${codePrefix}`;

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
