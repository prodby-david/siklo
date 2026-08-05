import { z } from 'zod';

export const updateGroupSchema = z.object({
  description: z.string().max(500, 'Description cannot exceed 500 characters').optional(),
});

export type UpdateGroupDTO = z.infer<typeof updateGroupSchema>;
