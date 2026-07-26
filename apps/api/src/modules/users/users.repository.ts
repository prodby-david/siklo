import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import { CreateUserDTO } from './schema/user.schema';
import { UserProfileSettingDTO } from '@siklo/shared-schemas';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
    });
  }

  async findUserById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
    });
  }

  async createUser(data: CreateUserDTO) {
    return this.prisma.user.create({
      data,
    });
  }

  async changePassword(id: string, password: string) {
    return this.prisma.user.update({
      where: { id },
      data: { password },
    });
  }

  async updateUserProfile(id: string, data: UserProfileSettingDTO) {
    return this.prisma.user.update({
      where: { id },
      data,
    });
  }
}
