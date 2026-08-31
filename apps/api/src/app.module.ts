import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './database/prisma.module';
import { GroupsModule } from './modules/groups/groups.module';
import { PaymentsModule } from './modules/payments/payments.module';
import { TokenModule } from './modules/token/token.module';
import { AiModule } from './modules/ai/ai.module';
import { WebsocketModule } from './modules/websocket/websocket.module';
import { ActivityModule } from './modules/activity/activity.module';
import { envSchema } from './configs/env.schema';
import { NotificationsModule } from './modules/notifications/notifications.module';
import { HealthModule } from './modules/health/health.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validate: (config) => envSchema.parse(config),
    }),
    UsersModule,
    AuthModule,
    PrismaModule,
    GroupsModule,
    PaymentsModule,
    TokenModule,
    AiModule,
    WebsocketModule,
    ActivityModule,
    NotificationsModule,
    HealthModule,
  ],
})
export class AppModule {}
