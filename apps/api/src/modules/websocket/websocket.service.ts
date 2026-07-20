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

  broadcastPayment(groupId: string, payment: unknown) {
    this.server.to(groupId).emit('payment.created', payment);
  }
}
