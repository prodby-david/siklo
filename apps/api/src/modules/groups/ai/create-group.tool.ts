import { GroupsService } from '../groups.service';
import { createGroupSchema } from '@siklo/shared-schemas';
import { z } from 'zod';

const aiCreateGroupSchema = createGroupSchema.extend({
  startDate: z.string().optional(),
});

export function createGroupTool(groupsService: GroupsService, userId: string) {
  return {
    description: 'Create a new paluwagan group',

    inputSchema: aiCreateGroupSchema,

    execute: async (params: z.infer<typeof aiCreateGroupSchema>) => {
      return groupsService.createGroup(
        {
          ...params,
          startDate: params.startDate ? new Date(params.startDate) : undefined,
        },
        userId,
      );
    },
  };
}
