import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: z.string().optional().default(''),
  NEXT_PUBLIC_CONTACT_API_URL: z.string().url('Invalid Contact API URL').default('https://us-central1-gya-app-4c8a9.cloudfunctions.net/submitContacto'),
  NEXT_PUBLIC_STATUS_API_URL: z.string().url('Invalid Status API URL').default('https://us-central1-gya-app-4c8a9.cloudfunctions.net/checkStatus'),
  NEXT_PUBLIC_API_URL: z.string().url('Invalid API URL').default('https://us-central1-gya-app-4c8a9.cloudfunctions.net/submitReclamo'),
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string().optional().default(''),
  NEXT_PUBLIC_FIREBASE_API_KEY: z.string().default('AIzaSyCcP7Nz9SwsWAalz_oMvBKPCVVPSKgIuIw'),
  NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: z.string().default('gya-app-4c8a9.firebaseapp.com'),
  NEXT_PUBLIC_FIREBASE_DATABASE_URL: z.string().default('https://gya-app-4c8a9-default-rtdb.firebaseio.com'),
  NEXT_PUBLIC_FIREBASE_PROJECT_ID: z.string().default('gya-app-4c8a9'),
  NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: z.string().default('gya-app-4c8a9.firebasestorage.app'),
  NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: z.string().default('784433037193'),
  NEXT_PUBLIC_FIREBASE_APP_ID: z.string().default('1:784433037193:web:2582cc84b6a9027fd66b58'),
  NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: z.string().default('G-TY0NJP1S81'),
  NEXT_PUBLIC_USE_EMULATORS: z.enum(['true', 'false']).optional().default('false'),
});

function getRawEnv(): Record<string, unknown> {
  return {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    NEXT_PUBLIC_CONTACT_API_URL: process.env.NEXT_PUBLIC_CONTACT_API_URL,
    NEXT_PUBLIC_STATUS_API_URL: process.env.NEXT_PUBLIC_STATUS_API_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
    NEXT_PUBLIC_FIREBASE_API_KEY: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
    NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
    NEXT_PUBLIC_FIREBASE_DATABASE_URL: process.env.NEXT_PUBLIC_FIREBASE_DATABASE_URL,
    NEXT_PUBLIC_FIREBASE_PROJECT_ID: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
    NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
    NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
    NEXT_PUBLIC_FIREBASE_APP_ID: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
    NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
    NEXT_PUBLIC_USE_EMULATORS: process.env.NEXT_PUBLIC_USE_EMULATORS,
  };
}

const _env = envSchema.safeParse(getRawEnv());

if (!_env.success) {
  // Se usa console directamente: este modulo se evalua antes que el logger (que depende de env).
  console.error('Invalid environment variables:', _env.error.flatten().fieldErrors);
  throw new Error('Invalid environment variables');
}

export const env = _env.data;

export type Env = z.infer<typeof envSchema>;
