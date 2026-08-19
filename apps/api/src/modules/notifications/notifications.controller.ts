import { Controller, Get, Patch, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '@/commons/guards/jwt-auth.guard';
import { CurrentUser } from '@/commons/decorators/current-user.decorator';
import { NotificationsService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private readonly notificationService: NotificationsService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getNotifications(@CurrentUser('sub') userId: string) {
    return this.notificationService.getUserNotifications(userId);
  }

  @Patch(':notificationId/read')
  @UseGuards(JwtAuthGuard)
  async markNotificationRead(
    @Param('notificationId') notificationId: string,
    @CurrentUser('sub') userId: string,
  ) {
    return this.notificationService.markNotificationRead(
      notificationId,
      userId,
    );
  }

  @Patch('read-all')
  @UseGuards(JwtAuthGuard)
  async markAllNotificationsRead(@CurrentUser('sub') userId: string) {
    return this.notificationService.markAllNotificationRead(userId);
  }
}

