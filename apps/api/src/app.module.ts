import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './database/prisma.module';
import { GroupsModule } from './modules/groups/groups.module';
import { TokenModule } from './modules/token/token.module';
import { RoundModule } from './modules/round/round.module';
import { SettingsModule } from './modules/settings/settings.module';
import { AiModule } from './modules/ai/ai.module';
import { WebsocketModule } from './modules/websocket/websocket.module';
import { ActivityModule } from './modules/activity/activity.module';
import { EmailService } from './modules/email/email.service';
import { EmailModule } from './modules/email/email.module';
import { envSchema } from './configs/env.schema';

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
    TokenModule,
    RoundModule,
    SettingsModule,
    AiModule,
    WebsocketModule,
    ActivityModule,
    EmailModule,
  ],
  controllers: [AppController],
  providers: [AppService, EmailService],
})
export class AppModule {}
