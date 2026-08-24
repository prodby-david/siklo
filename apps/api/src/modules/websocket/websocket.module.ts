import { Module } from '@nestjs/common';
import { WebsocketService } from './websocket.service';
import { WebsocketGateway } from './websocket.gateway';
import { TokenModule } from '../token/token.module';

@Module({
  imports: [TokenModule],
  providers: [WebsocketService, WebsocketGateway],
  exports: [WebsocketService],
})
export class WebsocketModule {}
