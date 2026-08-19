import { Module } from '@nestjs/common';
import { WebsocketService } from './websocket.service';
import { WebsocketGateway } from './websocket.gateway';
import { TokenModule } from '../token/token.module';
import { PrismaModule } from '@/database/prisma.module';

@Module({
  imports: [TokenModule, PrismaModule],
  providers: [WebsocketService, WebsocketGateway],
  exports: [WebsocketService],
})
export class WebsocketModule {}

