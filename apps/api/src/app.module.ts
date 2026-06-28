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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true, envFilePath: '.env' }),
    UsersModule,
    AuthModule,
    PrismaModule,
    GroupsModule,
    TokenModule,
    RoundModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
