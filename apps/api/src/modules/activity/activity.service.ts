import { Injectable, Logger } from '@nestjs/common';
import { ActivityRepository } from './activity.repository';
import { CreateActivityDTO } from './schema/create-activity.schema';
import { Prisma } from '@/generated/prisma/client';
import { PrismaService } from '@/database/prisma.service';
import { WebsocketService } from '../websocket/websocket.service';

@Injectable()
export class ActivityService {
  private readonly logger = new Logger(ActivityService.name);
  constructor(
    private readonly activityRepo: ActivityRepository,
    private readonly prisma: PrismaService,
    private readonly websocket: WebsocketService,
  ) {}

  async createActivity(data: CreateActivityDTO, tx?: Prisma.TransactionClient) {
    const client = tx ?? this.prisma;
    const newActivity = await this.activityRepo.createActivity(client, data);

    const group = await client.group.findUnique({
      where: { id: data.groupId },
    });

    if (!group) {
      this.logger.warn(`Group ${data.groupId} not found — skipping broadcast`);
      return newActivity;
    }

    this.websocket.broadcastActivity(data.groupId, newActivity);

    return newActivity;
  }

  async getGroupActivities(groupId: string) {
    return this.activityRepo.getGroupActivities(groupId);
  }
}
