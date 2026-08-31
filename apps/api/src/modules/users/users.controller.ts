import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  UseGuards,
  Res,
} from '@nestjs/common';
import type { Response } from 'express';
import { UsersService } from './users.service';
import { ZodValidationPipe } from '@/commons/pipes/zod-validation.pipe';
import { JwtAuthGuard } from '@/commons/guards/jwt-auth.guard';
import { CurrentUser } from '@/commons/decorators/current-user.decorator';
import {
  createUserSchema,
  changePasswordSchema,
  userProfileSettingSchema,
  paymentAccountDetailsSchema,
  type CreateUserDTO,
  type UserProfileSettingDTO,
  type ChangePasswordDTO,
  type PaymentAccountDetailsDTO,
} from '@siklo/shared-schemas';
import { getAccessTokenCookieOptions } from '../auth/auth.constants';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(
    @Body(new ZodValidationPipe(createUserSchema)) data: CreateUserDTO,
  ) {
    return this.usersService.createUser(data);
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  async getCurrentUserName(@CurrentUser('sub') userId: string) {
    return this.usersService.getCurrentUserName(userId);
  }

  @Patch('me/profile')
  @UseGuards(JwtAuthGuard)
  async updateProfileSettings(
    @Body(new ZodValidationPipe(userProfileSettingSchema))
    data: UserProfileSettingDTO,
    @CurrentUser('sub') userId: string,
  ) {
    return this.usersService.updateUserProfile(userId, data);
  }

  @Patch('me/password')
  @UseGuards(JwtAuthGuard)
  async changeUserPassword(
    @Body(new ZodValidationPipe(changePasswordSchema)) data: ChangePasswordDTO,
    @CurrentUser('sub') userId: string,
    @Res({ passthrough: true }) res: Response,
  ) {
    const result = await this.usersService.changeUserPassword(userId, data);
    res.clearCookie('access_token', getAccessTokenCookieOptions());
    return result;
  }

  @Patch('me/payment-accounts')
  @UseGuards(JwtAuthGuard)
  async updatePaymentAccounts(
    @Body(new ZodValidationPipe(paymentAccountDetailsSchema))
    data: PaymentAccountDetailsDTO,
    @CurrentUser('sub') userId: string,
  ) {
    return this.usersService.updatePaymentAccounts(userId, data);
  }
}
