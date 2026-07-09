import { z } from "zod";

export const signupBaseSchema = z.object({
  name: z
    .string()
    .min(1, "Full name is required")
    .min(2, "Name must be at least 2 characters")
    .max(100, "Name must be at most 100 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address")
    .max(255, "Email must be at most 255 characters"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  contactNumber: z
    .string()
    .min(11, "Contact number must be at least 11 numbers")
    .max(11, "Contact number must be at most 11 numbers"),
});

/** Alias for API usage — same schema, named to match the existing API type */
export const createUserSchema = signupBaseSchema;

export type SignupBaseDTO = z.infer<typeof signupBaseSchema>;
export type CreateUserDTO = z.infer<typeof createUserSchema>;
