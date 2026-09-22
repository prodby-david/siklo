import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TokenModule } from '../token/token.module';
import { AuthRepository } from './auth.repository';

@Module({
  imports: [TokenModule],
  providers: [AuthService, AuthRepository],
  exports: [AuthService],
  controllers: [AuthController],
})
export class AuthModule {}
