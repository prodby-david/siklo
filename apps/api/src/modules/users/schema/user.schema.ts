import { z } from 'zod';

export const userSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be at most 100 characters'),
  email: z
    .string()
    .regex(/[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,}$/i, 'Invalid email format')
    .max(255, 'Email must be at most 255 characters'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
  contactNumber: z.string().optional(),
});

export type CreateUserDTO = z.infer<typeof userSchema>;
