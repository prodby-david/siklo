import { z } from 'zod';

export const createGroupWithMemberSchema = z.object({
  name: z.string().min(3),
  description: z.string().min(3).optional(),
  contributionAmount: z.coerce.number().min(1),
  cycleDuration: z.coerce.number().min(1),
  billingCycle: z.enum([
    'DAILY',
    'WEEKLY',
    'MONTHLY',
    'BIMONTHLY',
    'QUARTERLY',
  ]),
  startDate: z.coerce.date(),
  inviteCode: z.string().length(6),
  organizerId: z.string(),
  maxMembers: z.coerce
    .number()
    .min(3, 'Minimum number of members should be at least 3'),
});

export const createGroupSchema = createGroupWithMemberSchema.omit({
  inviteCode: true,
  organizerId: true,
});

export type CreateGroupDTO = z.infer<typeof createGroupWithMemberSchema>;
export type CreateGroupData = z.infer<typeof createGroupSchema>;
