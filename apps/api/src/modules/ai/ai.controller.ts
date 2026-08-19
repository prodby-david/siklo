import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '@/commons/guards/jwt-auth.guard';
import { CurrentUser } from '@/commons/decorators/current-user.decorator';
import { UIMessage } from 'ai';

@UseGuards(JwtAuthGuard)
@Controller('chat')
export class AiController {
  constructor(private readonly aiService: AiService) {}

  @Post()
  async chatAI(
    @Body('messages') messages: UIMessage[],
    @CurrentUser('sub') userId: string,
  ) {
    try {
      const { text, toolResults } = await this.aiService.handleMessage(
        messages,
        userId,
      );
      return {
        reply: text || 'I understood your request. How else can I assist you?',
        toolResults,
      };
    } catch (error: unknown) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown AI processing error';
      return {
        reply:
          'I encountered an issue processing your request right now. Please try again in a moment.',
        error: errorMessage,
      };
    }
  }
}
