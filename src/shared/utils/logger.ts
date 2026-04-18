/**
 * @file logger.ts
 * @description Centralized logging utility using pino.
 * @module shared/utils
 */

import pino from "pino";

const isDev = process.env.NODE_ENV === "development" || process.env.NODE_ENV === undefined;

export const logger = pino({
  level: isDev ? "debug" : "info",
  transport: isDev
    ? {
        target: "pino-pretty",
        options: {
          colorize: true,
          translateTime: "SYS:standard",
          ignore: "pid,hostname",
        },
      }
    : undefined,
});

export default logger;