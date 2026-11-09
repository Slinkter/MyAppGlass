import { env } from "@/shared/config/env";
import { logger } from "@/shared/utils/logger";

type Grecaptcha = {
  ready: (cb: () => void) => void;
  execute: (key: string, opts: { action: string }) => Promise<string>;
};

let recaptchaPromise: Promise<void> | null = null;

/**
 * Preloads the Google reCAPTCHA v3 script on demand.
 * Shares a module-level promise and resolves safely.
 */
export const preloadRecaptcha = (): Promise<void> => {
  if (typeof window === "undefined" || !env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) {
    return Promise.resolve();
  }

  const win = window as unknown as { grecaptcha?: Grecaptcha };
  if (win.grecaptcha) {
    return Promise.resolve();
  }

  if (recaptchaPromise) {
    return recaptchaPromise;
  }

  const existingScript = document.getElementById("gya-recaptcha-script");
  if (existingScript) {
    recaptchaPromise = new Promise<void>((resolve) => {
      existingScript.addEventListener("load", () => resolve(), { once: true });
      existingScript.addEventListener("error", () => resolve(), { once: true });
    });
    return recaptchaPromise;
  }

  recaptchaPromise = new Promise<void>((resolve) => {
    const script = document.createElement("script");
    script.id = "gya-recaptcha-script";
    script.src = `https://www.google.com/recaptcha/api.js?render=${env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`;
    script.async = true;
    script.defer = true;
    script.onload = () => resolve();
    script.onerror = (err) => {
      logger.error("Failed to load reCAPTCHA script", err);
      resolve();
    };
    document.head.appendChild(script);
  });

  return recaptchaPromise;
};

/**
 * Executes Google reCAPTCHA v3 and returns the token.
 * Returns empty string if reCAPTCHA is unavailable or fails.
 */
export const executeRecaptcha = async (action: string): Promise<string> => {
  await preloadRecaptcha();

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
