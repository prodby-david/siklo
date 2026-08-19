import { Injectable } from '@nestjs/common';
import {
  generateText,
  convertToModelMessages,
  type UIMessage,
  isStepCount,
} from 'ai';
import { SIKLO_SYSTEM_PROMPT } from '@/commons/context/ai.context';
import { AiToolRegistry } from './registry/ai-tools.registry';
import { createOllama } from 'ollama-ai-provider-v2';

const ollamaProvider = createOllama({
  baseURL: 'http://localhost:11434/api',
});

const model =
  process.env.NODE_ENV === 'production'
    ? google('gemini-2.0-flash')
    : ollamaProvider('qwen3:4b');

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
