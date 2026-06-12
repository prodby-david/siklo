import { Injectable } from '@nestjs/common';
import { PrismaService } from '@/database/prisma.service';
import { AuthService } from '../auth/auth.service';
import { CreateUserDTO } from './schema/user.schema';

@Injectable()
export class UsersService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly authService: AuthService,
  ) {}

  async createUser(user: CreateUserDTO) {
    const hashedPassword = await this.authService.hashPassword(user.password);

    return this.prisma.user.create({
      data: {
        ...user,
        password: hashedPassword,
      },
    });
  }

  async getAllUsers() {
    return this.prisma.user.findMany();
  }
}
