import { PrismaService } from '@/database/prisma.service';
import { Injectable } from '@nestjs/common';

@Injectable()
export class RoundRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createRounds() {}
}
