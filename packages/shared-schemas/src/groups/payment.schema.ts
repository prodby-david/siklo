import { z } from "zod";
import { PAYMENT_METHODS } from "../enums/payment-method.js";

export const submitPaymentSchema = z.object({
  groupId: z.string().min(1, "Group ID is required"),
  roundId: z.string().optional(),
  cycleNumber: z.number().int().positive().optional(),
  turnNumber: z.number().int().positive().optional(),
  paymentMethod: z.enum(PAYMENT_METHODS),
  referenceNumber: z.string().optional(),
  proofUrl: z.string().optional(),
});

export const rejectPaymentSchema = z.object({
  rejectionReason: z
    .string()
    .trim()
    .min(5, "Rejection reason must be at least 5 characters")
    .max(300, "Rejection reason cannot exceed 300 characters"),
  rejectionProofUrl: z.string().optional().or(z.literal("")),
});

export const updateMemberPaymentPreferenceSchema = z.object({
  preferredPaymentMethod: z.enum(PAYMENT_METHODS),
  paymentAccountDetails: z.string().min(3, "Receiving account details required"),
});

export const markMemberPaidSchema = z.object({
  groupId: z.string().min(1, "Group ID is required"),
  memberUserId: z.string().min(1, "Member User ID is required"),
  cycleNumber: z.number().int().positive().optional(),
  referenceNumber: z
    .string()
    .trim()
    .max(100, "Reference number cannot exceed 100 characters")
    .optional()
    .or(z.literal("")),
  proofUrl: z.string().min(1, "Payment receipt proof image is required"),
});

export const markMemberRejectedSchema = z.object({
  groupId: z.string().min(1, "Group ID is required"),
  memberUserId: z.string().min(1, "Member User ID is required"),
  reason: z
    .string()
    .trim()
    .min(5, "Rejection reason must be at least 5 characters")
    .max(300, "Rejection reason cannot exceed 300 characters"),
  cycleNumber: z.number().int().positive().optional(),
  rejectionProofUrl: z.string().optional().or(z.literal("")),
});

export type SubmitPaymentDTO = z.infer<typeof submitPaymentSchema>;
export type RejectPaymentDTO = z.infer<typeof rejectPaymentSchema>;
export type UpdateMemberPaymentPreferenceDTO = z.infer<typeof updateMemberPaymentPreferenceSchema>;
export type MarkMemberPaidDTO = z.infer<typeof markMemberPaidSchema>;
export type MarkMemberRejectedDTO = z.infer<typeof markMemberRejectedSchema>;
