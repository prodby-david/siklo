import { Injectable } from '@nestjs/common';
import { Prisma } from '@/generated/prisma/client';
import { PrismaService } from '@/database/prisma.service';
import { CreateActivityDTO } from './schema/create-activity.schema';

@Injectable()
export class ActivityRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createActivity(tx: Prisma.TransactionClient, dto: CreateActivityDTO) {
    return tx.activity.create({
      data: {
        userId: dto.userId,
        groupId: dto.groupId,
        activity: dto.activityType,
        description: dto.description,
      },
    });
  }
}
