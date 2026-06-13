import { z } from 'zod';

export const joinGroupSchema = z.object({
  groupId: z.string(),
  userId: z.string(),
});

export type JoinGroupDTO = z.infer<typeof joinGroupSchema>;
