import { z } from "zod";

export const inviteCodeSchema = z.object({
  inviteCode: z
    .string()
    .min(1, "Invite code must not be empty.")
    .length(12, "Invalid invite code. Please check and try again."),
});

export type InviteCodeDTO = z.infer<typeof inviteCodeSchema>;