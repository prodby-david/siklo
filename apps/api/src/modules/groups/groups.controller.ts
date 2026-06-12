import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { GroupsService } from './groups.service';
import { CreateGroupDTO } from './dto/create-group.dto';
import { JoinGroupDTO } from './dto/join-group.dto';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}
  @Post()
  async createUserGroup(@Body() createGroupDto: CreateGroupDTO) {
    return this.groupsService.createUserGroup(createGroupDto);
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
