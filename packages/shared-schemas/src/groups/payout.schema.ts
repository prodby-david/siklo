import { z } from "zod";
import { uuidSchema } from "../common/identifier.schema.js";

export const requestAdvancePayoutSchema = z
  .object({
    roundId: uuidSchema,
    accountDetails: z
      .string()
      .trim()
      .min(3, "Receiving account details required")
      .max(500),
    notes: z
      .string()
      .trim()
      .max(200, "Notes cannot exceed 200 characters")
      .optional(),
  })
  .strict();

export const disbursePayoutSchema = z
  .object({
    roundId: uuidSchema,
    referenceNumber: z
      .string()
      .trim()
      .min(3, "Disbursement reference number is required (min 3 characters)")
      .max(100, "Reference number cannot exceed 100 characters"),
    proofUrl: z
      .string()
      .trim()
      .min(1, "Transfer proof screenshot or receipt is required"),
  })
  .strict();

export const confirmPayoutReceiptSchema = z
  .object({
    roundId: uuidSchema,
    notes: z
      .string()
      .trim()
      .max(200, "Notes cannot exceed 200 characters")
      .optional(),
  })
  .strict();

export type RequestAdvancePayoutDTO = z.infer<
  typeof requestAdvancePayoutSchema
>;
export type DisbursePayoutDTO = z.infer<typeof disbursePayoutSchema>;
export type ConfirmPayoutReceiptDTO = z.infer<
  typeof confirmPayoutReceiptSchema
>;
