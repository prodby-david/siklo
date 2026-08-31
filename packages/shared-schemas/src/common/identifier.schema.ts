import { z } from "zod";

export const uuidSchema = z.string().uuid("A valid identifier is required");

export const optionalProofSchema = z
  .string()
  .max(7_000_000, "Proof image is too large")
  .optional()
  .or(z.literal(""));
