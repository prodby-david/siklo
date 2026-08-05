import { Injectable } from '@nestjs/common';
import { Prisma } from '@/generated/prisma/client';
import { PrismaService } from '@/database/prisma.service';
import { CreateActivityDTO } from './schema/create-activity.schema';

@Injectable()
export class ActivityRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createActivity(
    tx: Prisma.TransactionClient | PrismaService | any,
    dto: CreateActivityDTO,
  ) {
    const client = tx ?? this.prisma;
    return client.activity.create({
      data: {
        userId: dto.userId,
        groupId: dto.groupId,
        activity: dto.activityType as any,
        description: dto.description,
      },
    });
  }

  async getGroupActivities(groupId: string) {
    return this.prisma.activity.findMany({
      where: { groupId },
      include: {
        user: {
          select: { id: true, name: true },
        },
      },
      orderBy: { createdAt: 'desc' },
      take: 50,
    });
  }
}
