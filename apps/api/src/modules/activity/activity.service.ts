import { Injectable } from '@nestjs/common';
import { ActivityRepository } from './activity.repository';
import { CreateActivityDTO } from './schema/create-activity.schema';
import { Prisma } from '@prisma/client/extension';
import { PrismaService } from '@/database/prisma.service';

@Injectable()
export class ActivityService {
  constructor(
    private readonly activityRepo: ActivityRepository,
    private readonly prisma: PrismaService,
  ) {}

  async createActivity(dto: CreateActivityDTO, tx?: Prisma.TransactionClient) {
    const client = tx ?? this.prisma;
    return this.activityRepo.createActivity(client, dto);
  }
}
