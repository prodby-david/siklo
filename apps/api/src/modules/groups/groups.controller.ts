import { Controller, Post, Body, Get, Param, UseGuards } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { ZodValidationPipe } from '@/commons/pipes/zod-validation.pipes';
import {
  createGroupSchema,
  createGroupWithMemberSchema,
} from './schema/create-group.schema';
import { JwtAuthGuard } from '@/commons/guards/jwt-auth';
import { CurrentUser } from '@/commons/decorators/current-user.decorator';
import type { CreateGroupData } from './schema/create-group.schema';
import type { JoinGroupDTO } from './schema/join-group.schema';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}
  @Post('create')
  @UseGuards(JwtAuthGuard)
  async createGroup(
    @Body(new ZodValidationPipe(createGroupSchema))
    createGroupDto: CreateGroupData,
    @CurrentUser('sub') userId: string,
  ) {
    return this.groupsService.createGroup(createGroupDto, userId);
  }

  @Post('join')
  @UseGuards(JwtAuthGuard)
  async joinGroup(@Body() dto: JoinGroupDTO) {
    return this.groupsService.joinGroup(dto);
  }

  @Get('my-groups')
  @UseGuards(JwtAuthGuard)
  async getUserGroup(@CurrentUser('sub') userId: string) {
    return this.groupsService.getUserGroup(userId);
  }
}
