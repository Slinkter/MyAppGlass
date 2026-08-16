import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: z.string().min(1, 'Google Maps API Key is required').optional(),
  NEXT_PUBLIC_CONTACT_API_URL: z.string().url('Invalid Contact API URL').default('https://us-central1-gya-app-4c8a9.cloudfunctions.net/submitContacto'),
  NEXT_PUBLIC_STATUS_API_URL: z.string().url('Invalid Status API URL').default('https://us-central1-gya-app-4c8a9.cloudfunctions.net/checkStatus'),
  NEXT_PUBLIC_API_URL: z.string().url('Invalid API URL').default('https://us-central1-gya-app-4c8a9.cloudfunctions.net/submitReclamo'),
  NEXT_PUBLIC_RECAPTCHA_SITE_KEY: z.string().optional(),
});

function getRawEnv(): Record<string, unknown> {
  return {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
    NEXT_PUBLIC_CONTACT_API_URL: process.env.NEXT_PUBLIC_CONTACT_API_URL,
    NEXT_PUBLIC_STATUS_API_URL: process.env.NEXT_PUBLIC_STATUS_API_URL,
    NEXT_PUBLIC_API_URL: process.env.NEXT_PUBLIC_API_URL,
    NEXT_PUBLIC_RECAPTCHA_SITE_KEY: process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
  };
}

const _env = envSchema.safeParse(getRawEnv());

if (!_env.success) {
  console.error('Invalid environment variables:', _env.error.flatten().fieldErrors);
  throw new Error('Invalid environment variables');
}

export const env = _env.data;

export type Env = z.infer<typeof envSchema>;
