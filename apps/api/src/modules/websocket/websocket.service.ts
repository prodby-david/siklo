import { Injectable } from '@nestjs/common';
import { Server } from 'socket.io';

@Injectable()
export class WebsocketService {
  private server: Server;

  setServer(server: Server) {
    this.server = server;
  }

  broadcastActivity(groupId: string, activity: unknown) {
    this.server.to(groupId).emit('activity.created', activity);
  }

  sendUserNotification(userId: string, notification: unknown) {
    this.server.to(`user_${userId}`).emit('notification.created', notification);
  }
}
