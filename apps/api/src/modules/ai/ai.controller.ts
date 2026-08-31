import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '@/commons/guards/jwt-auth.guard';
import { UIMessage } from 'ai';
import { ZodValidationPipe } from '@/commons/pipes/zod-validation.pipe';
import {
  chatRequestSchema,
  type ChatRequestDTO,
} from './schema/chat-message.schema';

@UseGuards(JwtAuthGuard)
@Controller('chat')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post()
  async chatAI(
    @Body(new ZodValidationPipe(chatRequestSchema)) body: ChatRequestDTO,
  ) {
    const { text, toolResults } = await this.aiService.handleMessage(
      body.messages as UIMessage[],
    );
    return {
      reply: text || 'I understood your request. How else can I assist you?',
      toolResults,
    };
  }
}
