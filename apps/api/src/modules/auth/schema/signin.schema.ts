import { z } from 'zod';

export const signInSchema = z.object({
  email: z
    .string()
    .regex(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i, 'Invalid email format')
    .max(255, 'Email must be at most 255 characters'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
});

export type SignInDTO = z.infer<typeof signInSchema>;
