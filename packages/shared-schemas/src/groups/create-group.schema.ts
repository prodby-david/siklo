import { z } from "zod";
import { BILLING_CYCLES } from "../enums/billing-cycle.js";
import { PAYOUT_SEQUENCES } from "../enums/payout-sequence.js";
import { PAYMENT_METHODS } from "../enums/payment-method.js";

export const createGroupBaseSchema = z.object({
  name: z
    .string({ message: "Group name is required" })
    .min(3, "Group name must be at least 3 characters long")
    .max(50, "Group name cannot exceed 50 characters"),
  description: z.string().optional(),
  contributionAmount: z.coerce
    .number({ message: "Contribution amount is required" })
    .min(50, "Contribution amount must be at least ₱50")
    .max(10000, "Contribution amount cannot exceed ₱10,000"),
  cycleDuration: z.coerce
    .number({ message: "Cycle duration is required" })
    .min(1, "Cycle duration must be at least 1 cycle"),
  billingCycle: z.enum(BILLING_CYCLES, {
    message: "Please select a valid billing cycle",
  }),
  payoutSequence: z.enum(PAYOUT_SEQUENCES, {
    message: "Please select a valid payout sequence",
  }),
  startDate: z.coerce.date().optional(),
  maxMembers: z.coerce
    .number({ message: "Member capacity is required" })
    .min(3, "Member capacity must be at least 3 members")
    .max(50, "Member capacity cannot exceed 50 members"),
  allowedPaymentMethods: z
    .array(z.enum(PAYMENT_METHODS), {
      message: "Please select valid payment methods",
    })
    .min(1, "Please select at least 1 allowed payment method for members")
    .default(["E_WALLET", "BANK_TRANSFER", "CASH"]),
  paymentDetails: z.string().optional(),
  gracePeriodDays: z.coerce
    .number()
    .min(0, "Grace period cannot be negative")
    .max(7, "Grace period is capped at 7 days maximum")
    .default(0),
  latePenaltyAmount: z.coerce
    .number()
    .int("Late penalty rate must be a whole percentage number (e.g. 5%)")
    .min(0, "Daily penalty rate cannot be negative")
    .max(10, "Daily penalty rate is capped at 10% per day maximum")
    .default(0),
  isOrganizerParticipating: z.boolean().default(true),
  organizerFeeAmount: z.coerce
    .number()
    .int("Organizer fee must be a whole integer amount")
    .min(0, "Organizer fee cannot be negative")
    .max(1000, "Organizer fee cannot exceed ₱1,000")
    .default(0),
});

export const createGroupFullSchema = createGroupBaseSchema
  .extend({
    inviteCode: z.string().length(12),
    organizerId: z.string(),
  })
  .superRefine((data, ctx) => {
    if (data.isOrganizerParticipating && (data.organizerFeeAmount || 0) > 0) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Participating organizers cannot charge a one-time fee",
        path: ["organizerFeeAmount"],
      });
    }
    if (!data.isOrganizerParticipating && (!data.organizerFeeAmount || data.organizerFeeAmount <= 0)) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Organizer fee is required when you do not participate in the cycle",
        path: ["organizerFeeAmount"],
      });
    }
  });

export const createGroupSchema = createGroupBaseSchema.superRefine((data, ctx) => {
  if (data.isOrganizerParticipating && (data.organizerFeeAmount || 0) > 0) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Participating organizers cannot charge a one-time fee",
      path: ["organizerFeeAmount"],
    });
  }
  if (!data.isOrganizerParticipating && (!data.organizerFeeAmount || data.organizerFeeAmount <= 0)) {
    ctx.addIssue({
      code: z.ZodIssueCode.custom,
      message: "Organizer fee is required when you do not participate in the cycle",
      path: ["organizerFeeAmount"],
    });
  }
});

export type CreateGroupBaseDTO = z.infer<typeof createGroupBaseSchema>;
export type CreateGroupFullDTO = z.infer<typeof createGroupFullSchema>;
export type CreateGroupDTO = z.infer<typeof createGroupSchema>;
