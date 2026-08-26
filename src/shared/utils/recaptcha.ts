import { env } from "@/shared/config/env";
import { logger } from "@/shared/utils/logger";

type Grecaptcha = {
  ready: (cb: () => void) => void;
  execute: (key: string, opts: { action: string }) => Promise<string>;
};

/**
 * Executes Google reCAPTCHA v3 and returns the token.
 * Returns empty string if reCAPTCHA is unavailable or fails.
 */
export const executeRecaptcha = async (action: string): Promise<string> => {
  const win =
    typeof window !== "undefined"
      ? (window as unknown as { grecaptcha?: Grecaptcha })
      : null;

  if (!win?.grecaptcha) return "";

  try {
    return await new Promise<string>((resolve, reject) => {
      win.grecaptcha!.ready(() => {
        win
          .grecaptcha!.execute(env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY, { action })
          .then((token: string) => resolve(token))
          .catch((err: unknown) => reject(err));
      });
    });
  } catch (err) {
    logger.error(`reCAPTCHA execution error in ${action}`, err);
    return "";
  }
};
