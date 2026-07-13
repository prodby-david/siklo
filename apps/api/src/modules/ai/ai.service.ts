import { Injectable } from '@nestjs/common';
import {
  generateText,
  convertToModelMessages,
  type UIMessage,
  isStepCount,
} from 'ai';
import { google } from '@ai-sdk/google';
import { ollama } from 'ollama-ai-provider-v2';
import { SIKLO_SYSTEM_PROMPT } from 'src/commons/context/ai.context';
import { createGroupSchema } from '@siklo/shared-schemas';
import { z } from 'zod';
import { AiToolRegistry } from './registry/ai-tools.registry';

const aiCreateGroupSchema = createGroupSchema.extend({
  startDate: z.string().optional().describe('ISO Date string (YYYY-MM-DD)'),
});

const model =
  process.env.NODE_ENV === 'production'
    ? google('gemini-3.5-flash')
    : ollama('qwen2.5:3b');

@Injectable()
export class AiService {
  constructor(private readonly toolRegistry: AiToolRegistry) {}

  async handleMessage(messages: UIMessage[], userId: string) {
    const { text, toolResults } = await generateText({
      model: model,
      system: SIKLO_SYSTEM_PROMPT,
      messages: await convertToModelMessages(messages),
      stopWhen: isStepCount(5),
      tools: this.toolRegistry.getTools(userId),
    });
    return { text, toolResults };
  }
}
