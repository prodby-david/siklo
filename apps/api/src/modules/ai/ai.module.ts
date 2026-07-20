import { Module } from '@nestjs/common';
import { AiService } from './ai.service';
import { AiController } from './ai.controller';
import { PrismaService } from '@/database/prisma.service';
import { AiToolRegistry } from './registry/ai-tools.registry';
import { GroupsModule } from '../groups/groups.module';
import { ActivityModule } from '../activity/activity.module';

@Module({
  imports: [GroupsModule, ActivityModule],
  controllers: [AiController],
  providers: [AiService, PrismaService, AiToolRegistry],
})
export class AiModule {}
