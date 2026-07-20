import { z } from 'zod';

export const CreateActivitySchema = z.object({
  userId: z.string(),
  groupId: z.string(),
  activityType: z.enum([
    'PAYMENT',
    'PAYMENT_OVERDUE',
    'PAYMENT_VERIFIED',
    'PAYOUT_DISBURSED',
    'PENALTY_APPLIED',
    'CYCLE_STARTED',
    'CYCLE_CLOSED',
    'ROTATED',
  ]),
  description: z.string(),
});

export type CreateActivityDTO = z.infer<typeof CreateActivitySchema>;
