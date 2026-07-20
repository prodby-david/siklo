import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  UseGuards,
  Delete,
} from '@nestjs/common';
import { JwtAuthGuard } from '@/commons/guards/jwt-auth';
import { CurrentUser } from '@/commons/decorators/current-user.decorator';
import { ZodValidationPipe } from '@/commons/pipes/zod-validation.pipes';
import { GroupsService } from './groups.service';
import { createGroupSchema } from './schema/create-group.schema';
import { joinGroupBodySchema } from './schema/join-group.schema';
import type { CreateGroupData } from './schema/create-group.schema';
import type { JoinGroupBodyDTO } from './schema/join-group.schema';

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
  async joinGroup(
    @Body(new ZodValidationPipe(joinGroupBodySchema))
    joinGroupDto: JoinGroupBodyDTO,
    @CurrentUser('sub') userId: string,
  ) {
    return this.groupsService.joinGroup(joinGroupDto, userId);
  }

  @Post(':id/start')
  @UseGuards(JwtAuthGuard)
  async startGroupCycle(
    @Param('id') groupId: string,
    @CurrentUser('sub') userId: string,
  ) {
    return this.groupsService.startGroupCycle(groupId, userId);
  }

  @Get('my-groups')
  @UseGuards(JwtAuthGuard)
  async getUserGroup(@CurrentUser('sub') userId: string) {
    return this.groupsService.getUsersGroup(userId);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getGroupById(
    @Param('id') groupId: string,
    @CurrentUser('sub') userId: string,
  ) {
    return this.groupsService.getGroupById(groupId, userId);
  }

  @Get('invite/:inviteCode')
  @UseGuards(JwtAuthGuard)
  async getGroupByInviteCodePreview(@Param('inviteCode') inviteCode: string) {
    return this.groupsService.getGroupByInviteCodePreview(inviteCode);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteGroup(
    @Param('id') groupId: string,
    @CurrentUser('sub') userId: string,
  ) {
    return this.groupsService.deleteGroup(groupId, userId);
  }
}
