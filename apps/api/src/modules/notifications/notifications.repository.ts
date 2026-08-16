import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import { CreateNotificationDTO } from '@siklo/shared-schemas';

@Injectable()
export class NotificationsRepository {
  constructor(private readonly prisma: PrismaService) {}

  async createNotification(dto: CreateNotificationDTO) {
    return this.prisma.notification.create({
      data: dto,
    });
  }

  async getUserNotification(userId: string) {
    const userNotifications = await this.prisma.notification.findMany({
      where: {
        userId,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return userNotifications;
  }

  async markNotificationRead(notificationId: string, userId: string) {
    return this.prisma.notification.updateMany({
      where: {
        id: notificationId,
        userId,
      },
      data: {
        isRead: true,
      },
    });
  }

  async markAllNotificationRead(userId: string) {
    return this.prisma.notification.updateMany({
      where: {
        userId,
        isRead: false,
      },
      data: {
        isRead: true,
      },
    });
  }
}
