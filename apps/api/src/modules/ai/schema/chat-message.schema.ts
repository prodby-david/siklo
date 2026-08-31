import { z } from 'zod';

export const chatRequestSchema = z
  .object({
    messages: z
      .array(
        z
          .object({
            id: z.string().max(200).optional(),
            role: z.enum(['system', 'user', 'assistant']),
            parts: z.array(z.unknown()).max(20),
          })
          .passthrough(),
      )
      .min(1)
      .max(30),
  })
  .strict();

export type ChatRequestDTO = z.infer<typeof chatRequestSchema>;
