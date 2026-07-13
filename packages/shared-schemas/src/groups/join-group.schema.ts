import { z } from "zod";

export const joinGroupSchema = z.object({
  groupId: z.string(),
  userId: z.string(),
});

export const joinGroupBodySchema = z.object({
  inviteCode: z.string().trim().length(12),
  position: z.coerce.number().optional(),
});

export type JoinGroupBodyDTO = z.infer<typeof joinGroupBodySchema>;

export type JoinGroupDTO = z.infer<typeof joinGroupSchema>;
