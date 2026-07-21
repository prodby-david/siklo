import * as cookie from 'cookie';
import {
  WebSocketGateway,
  WebSocketServer,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  MessageBody,
  ConnectedSocket,
  OnGatewayInit,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { WebsocketService } from './websocket.service';
import { TokenService } from '../token/token.service';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
})
export class WebsocketGateway
  implements OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit
{
  @WebSocketServer()
  server: Server;

  constructor(
    private readonly tokenService: TokenService,
    private readonly websocketService: WebsocketService,
  ) {}

  private readonly logger = new Logger(WebsocketGateway.name);

  afterInit(server: Server) {
    this.logger.log('WebSocket server initialized');
    this.websocketService.setServer(server);
  }

  async handleConnection(client: Socket) {
    try {
      const cookies = cookie.parseCookie(client.handshake.headers.cookie || '');

      const accessToken = cookies.access_token;

      if (!accessToken) {
        this.logger.warn('No access token.');
        client.disconnect();
        return;
      }

      const payload = await this.tokenService.verifyAccessToken(accessToken);

      client.data.user = payload.sub;

      this.logger.log(`User ${payload.sub} connected with socket ${client.id}`);
    } catch (error) {
      this.logger.error('Failed to connect:', error);
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    this.logger.log(`Client disconnected: ${client.id}`);
  }

  @SubscribeMessage('join-group')
  async handleJoinGroup(
    @ConnectedSocket() client: Socket,
    @MessageBody() roomId: string,
  ) {
    const userId = client.data.user;

    if (!userId) {
      client.disconnect();
      return;
    }

    client.join(roomId);
    this.logger.log(`User ${userId} joined room ${roomId}`);
  }
}
