import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import { CreateUserDTO, UserProfileSettingDTO } from '@siklo/shared-schemas';
import { Prisma } from '@/generated/prisma/client';

@Injectable()
export class UsersRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByEmail(email: string) {
    return this.prisma.user.findUnique({
      where: { email },
      select: {
        id: true,
        email: true,
        name: true,
      },
    });
  }

  async findUserById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        email: true,
        name: true,
        contactNumber: true,
        paymentAccounts: true,
        createdAt: true,
      },
    });
  }

  async findUserWithPasswordById(id: string) {
    return this.prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        password: true,
      },
    });
  }

  async createUser(data: CreateUserDTO) {
    return this.prisma.user.create({
      data,
      select: {
        id: true,
      },
    });
  }

  async changePassword(id: string, password: string) {
    return this.prisma.$transaction(async (tx) => {
      return tx.user.update({
        where: { id },
        data: {
          password,
          sessionVersion: { increment: 1 },
        },
        select: {
          id: true,
        },
      });
    });
  }

  async updateUserProfile(id: string, data: UserProfileSettingDTO) {
    return this.prisma.user.update({
      where: { id },
      data,
      select: {
        id: true,
      },
    });
  }

  async updatePaymentAccounts(id: string, data: unknown) {
    return this.prisma.user.update({
      where: { id },
      data: {
        paymentAccounts: (data as Prisma.InputJsonValue) ?? Prisma.JsonNull,
      },
      select: {
        id: true,
      },
    });
  }
}
