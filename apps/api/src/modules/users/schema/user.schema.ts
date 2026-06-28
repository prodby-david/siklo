import { z } from 'zod';

export const userSchema = z.object({
  name: z
    .string()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be at most 100 characters'),
  email: z
    .string()
    .email('Invalid email format')
    .max(255, 'Email must be at most 255 characters'),
  password: z
    .string()
    .min(1, 'Password is required')
    .min(8, 'Password must be at least 8 characters'),
  contactNumber: z
    .string()
    .min(11, 'Contact number must be at least 11 numbers')
    .max(11, 'Contact number must be at most 11 numbers'),
});

export type CreateUserDTO = z.infer<typeof userSchema>;
