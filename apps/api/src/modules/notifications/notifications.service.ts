import { Injectable } from '@nestjs/common';
import { NotificationsRepository } from './notifications.repository';
import { CreateNotificationDTO } from '@siklo/shared-schemas';
import { WebsocketService } from '../websocket/websocket.service';

@Injectable()
export class NotificationsService {
  constructor(
    private readonly notificationsRepository: NotificationsRepository,
    private readonly websocketService: WebsocketService,
  ) {}

  async createNotification(dto: CreateNotificationDTO) {
    const notification =
      await this.notificationsRepository.createNotification(dto);
    this.websocketService.sendUserNotification(dto.userId, notification);
    return notification;
  }

  async getUserNotifications(userId: string) {
    return this.notificationsRepository.getUserNotification(userId);
  }

  async markNotificationRead(notificationId: string, userId: string) {
    return this.notificationsRepository.markNotificationRead(
      notificationId,
      userId,
    );
  }

  async markAllNotificationRead(userId: string) {
    return this.notificationsRepository.markAllNotificationRead(userId);
  }
}
