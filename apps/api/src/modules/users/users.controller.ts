import { Body, Controller, Get, Post, Patch, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { userSchema, type CreateUserDTO } from './schema/user.schema';
import { ZodValidationPipe } from '@/commons/pipes/zod-validation.pipe';
import { JwtAuthGuard } from '@/commons/guards/jwt-auth.guard';
import { CurrentUser } from '@/commons/decorators/current-user.decorator';
import {
  changePasswordSchema,
  userProfileSettingSchema,
  paymentAccountDetailsSchema,
  type UserProfileSettingDTO,
  type ChangePasswordDTO,
  type PaymentAccountDetailsDTO,
} from '@siklo/shared-schemas';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(
    @Body(new ZodValidationPipe(userSchema)) data: CreateUserDTO,
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
  ) {
    return this.usersService.changeUserPassword(userId, data);
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

