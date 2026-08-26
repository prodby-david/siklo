import {
  Injectable,
  ConflictException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AuthService } from '../auth/auth.service';
import { CreateUserDTO } from './schema/user.schema';
import {
  type ChangePasswordDTO,
  type UserProfileSettingDTO,
  type PaymentAccountDetailsDTO,
} from '@siklo/shared-schemas';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly authService: AuthService,
  ) {}

  private async getExistingUser(userId: string) {
    const user = await this.usersRepository.findUserById(userId);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }

  private async getExistingUserWithPassword(userId: string) {
    const user = await this.usersRepository.findUserWithPasswordById(userId);

    if (!user) {
      throw new NotFoundException('User not found.');
    }

    return user;
  }

  async createUser(user: CreateUserDTO) {
    const emailIsUsed = await this.usersRepository.findByEmail(user.email);

    if (emailIsUsed) {
      throw new ConflictException('Email is already used.');
    }

    const hashedPassword = await this.authService.hashPassword(user.password);

    await this.usersRepository.createUser({
      ...user,
      password: hashedPassword,
    });

    return {
      message: 'Account successfully created.',
    };
  }

  async getCurrentUserName(userId: string) {
    return this.getExistingUser(userId);
  }

  async updateUserProfile(id: string, dto: UserProfileSettingDTO) {
    await this.getExistingUser(id);

    await this.usersRepository.updateUserProfile(id, dto);

    return {
      message: 'Profile updated successfully.',
    };
  }

  async changeUserPassword(id: string, dto: ChangePasswordDTO) {
    const user = await this.getExistingUserWithPassword(id);

    const isCurrentPasswordValid = await this.authService.comparePassword(
      dto.currentPassword,
      user.password,
    );

    if (!isCurrentPasswordValid) {
      throw new UnauthorizedException('Invalid current password.');
    }

    const hashedPassword = await this.authService.hashPassword(dto.newPassword);

    await this.usersRepository.changePassword(id, hashedPassword);

    return {
      message: 'Password changed successfully.',
    };
  }

  async updatePaymentAccounts(id: string, dto: PaymentAccountDetailsDTO) {
    await this.getExistingUser(id);

    await this.usersRepository.updatePaymentAccounts(id, dto);

    return {
      message: 'Payment accounts updated successfully.',
    };
  }
}
