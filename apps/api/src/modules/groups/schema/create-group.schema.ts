import { z } from 'zod';

export const createGroupWithMemberSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(3),
  contributionAmount: z.coerce.number().min(1),
  startDate: z.string(),
  groupId: z.string(),
  userId: z.string(),
});

export type CreateGroupDTO = z.infer<typeof createGroupWithMemberSchema>;
