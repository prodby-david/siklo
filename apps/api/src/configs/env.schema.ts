import { z } from 'zod';

export const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  DIRECT_URL: z.string().url(),
  JWT_ACCESS_TOKEN: z.string().min(1),
  JWT_REFRESH_TOKEN: z.string().min(1),
  GOOGLE_GENERATIVE_AI_API_KEY: z.string().min(1),
  FRONTEND_URL: z.string().url(),
  RESEND_API_KEY: z.string().min(1),
  RESEND_FROM_EMAIL: z.string().email(),
  PORT: z.coerce.number().default(3001),
  OPENROUTER_API_KEY: z.string().min(1),
});

export type Env = z.infer<typeof envSchema>;
