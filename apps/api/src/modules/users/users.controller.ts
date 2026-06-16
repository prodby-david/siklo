import { Body, Controller, Get, Post } from '@nestjs/common';
import { UsersService } from './users.service';
import { userSchema, type CreateUserDTO } from './schema/user.schema';
import { ZodValidationPipe } from '@/commons/pipes/zod-validation.pipes';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async createUser(
    @Body(new ZodValidationPipe(userSchema)) data: CreateUserDTO,
  ) {
    return this.usersService.createUser(data);
  }
}
