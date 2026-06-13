import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { ZodValidationPipe } from '@/commons/pipes/zod-validation.pipes';
import { createGroupWithMemberSchema } from './schema/create-group.schema';
import type { CreateGroupDTO } from './schema/create-group.schema';
import type { JoinGroupDTO } from './schema/join-group.schema';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}
  @Post('create')
  async createGroup(
    @Body(new ZodValidationPipe(createGroupWithMemberSchema))
    createGroupDto: CreateGroupDTO,
  ) {
    return this.groupsService.createGroup(createGroupDto);
  }

  @Post('join')
  async joinGroup(@Body() dto: JoinGroupDTO) {
    return this.groupsService.joinGroup(dto);
  }

  @Get(':userId')
  async getUserGroup(@Param('userId') userId: string) {
    return this.groupsService.getUserGroup(userId);
  }

  @Get()
  async getAllGroups() {
    return this.groupsService.getAllGroups();
  }
}
