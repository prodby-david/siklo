import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { GroupsService } from '../groups/groups.service';
import { PrismaService } from '@/database/prisma.service';
import { GroupsRepository } from '../groups/groups.repository';
import { AiToolRegistry } from './registry/ai-tools.registry';

@Module({
  controllers: [AiController],
  providers: [
    AiService,
    GroupsService,
    PrismaService,
    GroupsRepository,
    AiToolRegistry,
  ],
})
export class AiModule {}
