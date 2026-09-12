import { z } from "zod";
import { uuidSchema } from "../common/identifier.schema.js";

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
