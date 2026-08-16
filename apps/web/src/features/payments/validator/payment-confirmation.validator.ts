import { z } from "zod";

export const confirmApprovalSchema = z
  .object({
    referenceNumber: z
      .string()
      .trim()
      .max(100, "Reference number cannot exceed 100 characters")
      .optional()
      .or(z.literal("")),
    proofUrl: z.string().optional().or(z.literal("")),
  })
  .refine(
    (data) =>
      (Boolean(data.referenceNumber) &&
        data.referenceNumber!.trim().length >= 3) ||
      (Boolean(data.proofUrl) && data.proofUrl!.trim().length > 0),
    {
      message:
        "Please provide either a reference number (min 3 chars) or upload a receipt image",
      path: ["referenceNumber"],
    },
  );

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
