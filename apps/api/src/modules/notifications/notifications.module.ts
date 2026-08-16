import { Module } from '@nestjs/common';
import { NotificationsController } from './notifications.controller';
import { NotificationsService } from './notifications.service';
import { WebsocketModule } from '../websocket/websocket.module';
import { NotificationsRepository } from './notifications.repository';

@Module({
  imports: [WebsocketModule],
  controllers: [NotificationsController],
  providers: [NotificationsService, NotificationsRepository],
  exports: [NotificationsService],
})
export class NotificationsModule {}
