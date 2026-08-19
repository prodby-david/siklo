import { z } from "zod";

export const confirmApprovalSchema = z.object({
  referenceNumber: z
    .string()
    .trim()
    .max(100, "Notes cannot exceed 100 characters")
    .optional()
    .or(z.literal("")),
  proofUrl: z.string().min(1, "Please upload a payment receipt or proof image"),
});

export type ConfirmApprovalInput = z.infer<typeof confirmApprovalSchema>;

export const confirmRejectionSchema = z.object({
  reason: z
    .string()
    .trim()
    .min(5, "Rejection reason must be at least 5 characters")
    .max(300, "Rejection reason cannot exceed 300 characters"),
  rejectionProofUrl: z.string().optional().or(z.literal("")),
});

export type ConfirmRejectionInput = z.infer<typeof confirmRejectionSchema>;

export const rejectPaymentSchema = z.object({
  rejectionReason: z
    .string()
    .trim()
    .min(5, "Please enter a detailed rejection reason (min 5 chars).")
    .max(300, "Rejection reason cannot exceed 300 characters"),
  rejectionProofUrl: z.string().optional().or(z.literal("")),
});

export type PaymentRejectionInput = z.infer<typeof rejectPaymentSchema>;
