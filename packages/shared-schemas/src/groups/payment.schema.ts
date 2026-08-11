import { z } from "zod";
import { PAYMENT_METHODS } from "../enums/payment-method.js";

export const submitPaymentSchema = z.object({
  groupId: z.string(),
  roundId: z.string(),
  paymentMethod: z.enum(PAYMENT_METHODS),
  referenceNumber: z.string().optional(),
  proofUrl: z.string().optional(),
});

export const rejectPaymentSchema = z.object({
  paymentId: z.string(),
  rejectionReason: z.string().min(5, "Rejection reason must be at least 5 characters"),
  rejectionProofUrl: z.string().optional(),
});

export const updateMemberPaymentPreferenceSchema = z.object({
  preferredPaymentMethod: z.enum(PAYMENT_METHODS),
  paymentAccountDetails: z.string().min(3, "Receiving account details required"),
});

export type SubmitPaymentDTO = z.infer<typeof submitPaymentSchema>;
export type RejectPaymentDTO = z.infer<typeof rejectPaymentSchema>;
export type UpdateMemberPaymentPreferenceDTO = z.infer<typeof updateMemberPaymentPreferenceSchema>;
