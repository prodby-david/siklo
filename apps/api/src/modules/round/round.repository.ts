import { PrismaService } from '@/database/prisma.service';

export class RoundRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createRounds() {}
}
