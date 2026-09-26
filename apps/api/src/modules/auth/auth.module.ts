import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TokenModule } from '../token/token.module';
import { AuthRepository } from './auth.repository';
import { RateLimitModule } from '@/infrastructure/rate-limit/rate-limit.module';

@Module({
  imports: [TokenModule, RateLimitModule],
  providers: [AuthService, AuthRepository],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
