import { z } from "zod";

export const signinSchema = z.object({
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  password: z.string().min(1, "Password is required"),
});

export type SigninFormData = z.infer<typeof signinSchema>;

export type SigninErrors = Partial<Record<keyof SigninFormData, string>>;
