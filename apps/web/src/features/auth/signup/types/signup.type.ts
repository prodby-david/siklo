import { signupBaseSchema } from '@siklo/shared-schemas';
import { z } from 'zod';

export const signupSchema = signupBaseSchema
  .extend({
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
  });

export type SignupFormData = z.infer<typeof signupSchema>;

export type SignupErrors = Partial<Record<keyof SignupFormData, string>>;

