import {
  Injectable,
  ConflictException,
  NotFoundException,
} from '@nestjs/common';
import { UsersRepository } from './users.repository';
import { AuthService } from '../auth/auth.service';
import { CreateUserDTO } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersRepository: UsersRepository,
    private readonly authService: AuthService,
  ) {}

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
    const user = await this.usersRepository.findUserById(userId);
    if (!user) {
      throw new NotFoundException('User not found.');
    }
    return user;
  }
}
