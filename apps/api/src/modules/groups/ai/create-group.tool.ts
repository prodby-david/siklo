import { tool } from 'ai';
import { createGroupSchema } from '@siklo/shared-schemas';
import { z } from 'zod';

const aiCreateGroupSchema = createGroupSchema.extend({
  startDate: z.string().optional(),
});

export function prepareGroupCreationTool() {
  return tool({
    description:
      'Validate and prepare paluwagan group details for the user to review before creating the group',
    inputSchema: aiCreateGroupSchema,
    execute: async (params) => ({
      action: 'CREATE_GROUP',
      requiresConfirmation: true,
      payload: params,
    }),
  });
}
