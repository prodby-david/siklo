import { z } from "zod";

export const signupSchema = z
  .object({
    name: z.string().min(1, "Full name is required"),
    email: z
      .string()
      .min(1, "Email is required")
      .email("Please enter a valid email address"),
    password: z.string().min(8, "Password must be at least 8 characters"),
    confirmPassword: z.string().min(1, "Please confirm your password"),
    contactNumber: z
      .string()
      .refine(
        (val) => val && /^\+?[0-9]{11}$/.test(val.replace(/[\s-]/g, "")),
        "Please enter a valid contact number",
      ),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  });

export type SignupFormData = z.infer<typeof signupSchema>;

export type SignupErrors = Partial<Record<keyof SignupFormData, string>>;
