import { z } from 'zod';

export const CreateActivitySchema = z.object({
  userId: z.string(),
  groupId: z.string(),
  activityType: z.enum([
    'PAYMENT',
    'PAYMENT_OVERDUE',
    'PAYMENT_VERIFIED',
    'PAYMENT_REJECTED',
    'PAYOUT_DISBURSED',
    'PAYOUT_RECEIVED',
    'PENALTY_APPLIED',
    'CYCLE_STARTED',
    'CYCLE_CLOSED',
    'ROTATED',
    'ANNOUNCEMENT',
  ]),
  description: z.string(),
});

export type CreateActivityDTO = z.infer<typeof CreateActivitySchema>;
