import { z } from "zod";
import { BILLING_CYCLES } from "../enums/billing-cycle.js";
import { PAYOUT_SEQUENCES } from "../enums/payout-sequence.js";
import { PAYMENT_METHODS } from "../enums/payment-method.js";

export const updateGroupSchema = z.object({
  name: z
    .string()
    .min(3, "Group name must be at least 3 characters long")
    .max(50, "Group name cannot exceed 50 characters")
    .optional(),
  description: z
    .string()
    .max(500, "Description cannot exceed 500 characters")
    .optional(),
  contributionAmount: z.coerce
    .number()
    .min(50, "Contribution amount must be at least ₱50")
    .max(10000, "Contribution amount cannot exceed ₱10,000")
    .optional(),
  maxMembers: z.coerce
    .number()
    .min(3, "Member capacity must be at least 3 members")
    .max(50, "Member capacity cannot exceed 50 members")
    .optional(),
  billingCycle: z.enum(BILLING_CYCLES).optional(),
  payoutSequence: z.enum(PAYOUT_SEQUENCES).optional(),
  gracePeriodDays: z.coerce
    .number()
    .min(0, "Grace period cannot be negative")
    .max(7, "Grace period is capped at 7 days maximum")
    .optional(),
  latePenaltyAmount: z.coerce
    .number()
    .min(0, "Daily penalty rate cannot be negative")
    .max(10, "Daily penalty rate is capped at 10% per day maximum")
    .optional(),
  allowedPaymentMethods: z
    .array(z.enum(PAYMENT_METHODS))
    .min(1, "Please select at least 1 payment method")
    .optional(),
  paymentDetails: z.string().optional(),
});

export type UpdateGroupDTO = z.infer<typeof updateGroupSchema>;

export const sendAnnouncementSchema = z.object({
  message: z.string().min(1, "Message cannot be empty").max(1000, "Message is too long"),
});

export type SendAnnouncementDTO = z.infer<typeof sendAnnouncementSchema>;

export const selectSlotSchema = z.object({
  position: z.coerce.number().int().min(1, "Position must be at least 1"),
});

export type SelectSlotDTO = z.infer<typeof selectSlotSchema>;
