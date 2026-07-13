import { z } from "zod";
import { BILLING_CYCLES } from "../enums/billing-cycle.js";
import { PAYOUT_SEQUENCES } from "../enums/payout-sequence.js";

export const createGroupFullSchema = z.object({
  name: z.string().min(3, "Group name must be at least 3 characters"),
  description: z.string().optional(),
  contributionAmount: z.coerce
    .number()
    .min(1, "Contribution amount is required"),
  cycleDuration: z.coerce.number().min(1, "Cycle duration must be at least 1"),
  billingCycle: z.enum(BILLING_CYCLES),
  payoutSequence: z.enum(PAYOUT_SEQUENCES),
  startDate: z.coerce.date().optional(),
  maxMembers: z.coerce
    .number()
    .min(3, "Minimum number of members should be at least 3"),
  inviteCode: z.string().length(12),
  organizerId: z.string(),
});

/**
 * Create-group schema without server-generated fields.
 * Used by the API controller (inviteCode and organizerId are added server-side)
 * and as the base for the web form (which extends with totalPayout).
 */
export const createGroupSchema = createGroupFullSchema.omit({
  inviteCode: true,
  organizerId: true,
});

export type CreateGroupFullDTO = z.infer<typeof createGroupFullSchema>;
export type CreateGroupDTO = z.infer<typeof createGroupSchema>;
