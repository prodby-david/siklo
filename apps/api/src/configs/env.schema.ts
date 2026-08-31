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
});

export type Env = z.infer<typeof envSchema>;
