import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'test', 'production']).default('development'),
  NEXT_PUBLIC_GOOGLE_MAPS_API_KEY: z.string().min(1, 'Google Maps API Key is required').optional(),
  NEXT_PUBLIC_CONTACT_API_URL: z.string().url('Invalid Contact API URL').min(1, 'Contact API URL is required'),
  NEXT_PUBLIC_STATUS_API_URL: z.string().url('Invalid Status API URL').min(1, 'Status API URL is required'),
  NEXT_PUBLIC_API_URL: z.string().url('Invalid API URL').min(1, 'API URL is required'),
});

const _env = envSchema.safeParse(process.env);

if (!_env.success) {
  console.error('❌ Invalid environment variables:', _env.error.flatten().fieldErrors);
  throw new Error('Invalid environment variables');
}

export const env = _env.data;

export type Env = z.infer<typeof envSchema>;
