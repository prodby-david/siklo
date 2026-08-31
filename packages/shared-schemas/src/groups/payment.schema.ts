import { z } from "zod";
import { PAYMENT_METHODS } from "../enums/payment-method.js";
import {
  optionalProofSchema,
  uuidSchema,
} from "../common/identifier.schema.js";

export const submitPaymentSchema = z
  .object({
    roundId: uuidSchema,
    paymentMethod: z.enum(PAYMENT_METHODS),
    referenceNumber: z.string().trim().max(100).optional(),
    proofUrl: optionalProofSchema,
  })
  .strict();

export const rejectPaymentSchema = z
  .object({
    rejectionReason: z
      .string()
      .trim()
      .min(5, "Rejection reason must be at least 5 characters")
      .max(300, "Rejection reason cannot exceed 300 characters"),
    rejectionProofUrl: optionalProofSchema,
  })
  .strict();

export const updateMemberPaymentPreferenceSchema = z.object({
  preferredPaymentMethod: z.enum(PAYMENT_METHODS),
  paymentAccountDetails: z
    .string()
    .min(3, "Receiving account details required"),
});

export const markMemberPaidSchema = z
  .object({
    groupId: uuidSchema,
    memberUserId: uuidSchema,
    cycleNumber: z.number().int().positive().optional(),
    referenceNumber: z
      .string()
      .trim()
      .max(100, "Reference number cannot exceed 100 characters")
      .optional()
      .or(z.literal("")),
    proofUrl: optionalProofSchema.refine(
      Boolean,
      "Payment receipt proof image is required",
    ),
  })
  .strict();

export const markMemberRejectedSchema = z
  .object({
    groupId: uuidSchema,
    memberUserId: uuidSchema,
    reason: z
      .string()
      .trim()
      .min(5, "Rejection reason must be at least 5 characters")
      .max(300, "Rejection reason cannot exceed 300 characters"),
    cycleNumber: z.number().int().positive().optional(),
    rejectionProofUrl: optionalProofSchema,
  })
  .strict();

export type SubmitPaymentDTO = z.infer<typeof submitPaymentSchema>;
export type RejectPaymentDTO = z.infer<typeof rejectPaymentSchema>;
export type UpdateMemberPaymentPreferenceDTO = z.infer<
  typeof updateMemberPaymentPreferenceSchema
>;
export type MarkMemberPaidDTO = z.infer<typeof markMemberPaidSchema>;
export type MarkMemberRejectedDTO = z.infer<typeof markMemberRejectedSchema>;
