import { z } from 'zod';

export const envSchema = z.object({
  NODE_ENV: z
    .enum(['development', 'test', 'production'])
    .default('development'),
  DATABASE_URL: z.string().url(),
  DIRECT_URL: z.string().url(),
  JWT_ACCESS_TOKEN: z.string().min(32),
  GOOGLE_GENERATIVE_AI_API_KEY: z.string().min(1),
  FRONTEND_URL: z.string().url(),
  RESEND_API_KEY: z.string().min(1),
  RESEND_FROM_EMAIL: z.string().email(),
  PORT: z.coerce.number().default(3001),
  OPENROUTER_API_KEY: z.string().min(1),
  UPSTASH_REDIS_REST_URL: z.string().url(),
  UPSTASH_REDIS_REST_TOKEN: z.string().min(1),
  RATE_LIMIT_SECRET_KEY: z.string().min(32),
  REDIS_URL: z
    .string()
    .min(1)
    .refine(
      (url) => url.startsWith('redis://') || url.startsWith('rediss://'),
      {
        message: 'REDIS_URL must start with redis:// or rediss://',
      },
    ),
});

export type Env = z.infer<typeof envSchema>;
