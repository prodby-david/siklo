import { z } from "zod";
import { uuidSchema } from "../common/identifier.schema.js";
import { BILLING_CYCLES } from "../enums/billing-cycle.js";

export const inviteStatusSchema = z.enum([
  "PENDING",
  "ACCEPTED",
  "DECLINED",
  "CANCELLED",
]);

export type InviteStatus = z.infer<typeof inviteStatusSchema>;

export const createInviteSchema = z.object({
  groupId: uuidSchema,
  email: z.string().trim().email("Please enter a valid email address"),
});

export type CreateInviteDTO = z.infer<typeof createInviteSchema>;

export const acceptInviteSchema = z.object({
  position: z.coerce.number().int().positive().optional(),
});

export type AcceptInviteDTO = z.infer<typeof acceptInviteSchema>;

export const inviteSchema = z.object({
  id: uuidSchema,
  groupId: uuidSchema,
  status: inviteStatusSchema,
  organizerId: uuidSchema,
  inviteeId: uuidSchema,
  createdAt: z.union([z.string(), z.date()]),
  updatedAt: z.union([z.string(), z.date()]),
});

export type InviteDTO = z.infer<typeof inviteSchema>;

export const pendingInviteSchema = z.object({
  id: uuidSchema,
  groupId: uuidSchema,
  status: inviteStatusSchema,
  createdAt: z.union([z.string(), z.date()]),
  group: z.object({
    id: uuidSchema,
    name: z.string(),
    contributionAmount: z.number().int(),
    billingCycle: z.enum(BILLING_CYCLES),
  }),
  organizer: z.object({
    id: uuidSchema,
    name: z.string(),
  }),
});

export const pendingInvitesSchema = z.array(pendingInviteSchema);

export type PendingInviteDTO = z.infer<typeof pendingInviteSchema>;
export type PendingInvitesDTO = z.infer<typeof pendingInvitesSchema>;
