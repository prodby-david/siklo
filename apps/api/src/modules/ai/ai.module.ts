import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { AiToolRegistry } from './registry/ai-tools.registry';

@Module({
  controllers: [AiController],
  providers: [AiService, AiToolRegistry],
})
export class AiModule {}
