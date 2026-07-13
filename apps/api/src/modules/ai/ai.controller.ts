import { Controller, UseGuards, Post, Body } from '@nestjs/common';
import { AiService } from './ai.service';
import { JwtAuthGuard } from '@/commons/guards/jwt-auth';
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
    const { text, toolResults } = await this.aiService.handleMessage(messages, userId);
    return { reply: text, toolResults };
  }
}
