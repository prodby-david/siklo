import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Query,
  UseGuards,
  Delete,
  Patch,
} from '@nestjs/common';
import { JwtAuthGuard } from '@/commons/guards/jwt-auth.guard';
import { CurrentUser } from '@/commons/decorators/current-user.decorator';
import { ZodValidationPipe } from '@/commons/pipes/zod-validation.pipe';
import { GroupsService } from './groups.service';
import { createGroupSchema } from './schema/create-group.schema';
import { joinGroupBodySchema } from './schema/join-group.schema';
import {
  updateGroupSchema,
  updateMemberPaymentPreferenceSchema,
  sendAnnouncementSchema,
  selectSlotSchema,
  type UpdateGroupDTO,
  type UpdateMemberPaymentPreferenceDTO,
  type SendAnnouncementDTO,
  type SelectSlotDTO,
} from '@siklo/shared-schemas';
import type { CreateGroupData } from './schema/create-group.schema';
import type { JoinGroupBodyDTO } from './schema/join-group.schema';

@Controller('groups')
export class GroupsController {
  constructor(private readonly groupsService: GroupsService) {}

  @Post()
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

  @Post(':id/cycle')
  @UseGuards(JwtAuthGuard)
  async startGroupCycle(
    @Param('id') groupId: string,
    @CurrentUser('sub') userId: string,
  ) {
    return this.groupsService.startGroupCycle(groupId, userId);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async getUserGroup(
    @CurrentUser('sub') userId: string,
    @Query('status') status?: string,
  ) {
    return this.groupsService.getUsersGroup(userId, status);
  }

  @Get('invites/:inviteCode')
  @UseGuards(JwtAuthGuard)
  async getGroupByInviteCodePreview(@Param('inviteCode') inviteCode: string) {
    return this.groupsService.getGroupByInviteCodePreview(inviteCode);
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard)
  async getGroupById(
    @Param('id') groupId: string,
    @CurrentUser('sub') userId: string,
  ) {
    return this.groupsService.getGroupById(groupId, userId);
  }

  @Patch(':id/members/me/payment-preference')
  @UseGuards(JwtAuthGuard)
  async updateMemberPaymentPreference(
    @Param('id') groupId: string,
    @Body(new ZodValidationPipe(updateMemberPaymentPreferenceSchema))
    body: UpdateMemberPaymentPreferenceDTO,
    @CurrentUser('sub') userId: string,
  ) {
    return this.groupsService.updateMemberPaymentPreference(
      groupId,
      body,
      userId,
    );
  }

  @Post(':id/announcements')
  @UseGuards(JwtAuthGuard)
  async sendAnnouncement(
    @Param('id') groupId: string,
    @Body(new ZodValidationPipe(sendAnnouncementSchema))
    body: SendAnnouncementDTO,
    @CurrentUser('sub') userId: string,
  ) {
    return this.groupsService.sendAnnouncement(groupId, body.message, userId);
  }

  @Delete(':id/members/:memberUserId')
  @UseGuards(JwtAuthGuard)
  async removeMember(
    @Param('id') groupId: string,
    @Param('memberUserId') memberUserId: string,
    @CurrentUser('sub') userId: string,
  ) {
    return this.groupsService.removeMember(groupId, memberUserId, userId);
  }

  @Patch(':id/members/me/slot')
  @UseGuards(JwtAuthGuard)
  async selectSlot(
    @Param('id') groupId: string,
    @Body(new ZodValidationPipe(selectSlotSchema))
    body: SelectSlotDTO,
    @CurrentUser('sub') userId: string,
  ) {
    return this.groupsService.selectSlot(groupId, body.position, userId);
  }

  @Delete(':id')
  @UseGuards(JwtAuthGuard)
  async deleteGroup(
    @Param('id') groupId: string,
    @CurrentUser('sub') userId: string,
  ) {
    return this.groupsService.deleteGroup(groupId, userId);
  }

  @Patch(':id')
  @UseGuards(JwtAuthGuard)
  async updateGroup(
    @Param('id') groupId: string,
    @Body(new ZodValidationPipe(updateGroupSchema)) body: UpdateGroupDTO,
    @CurrentUser('sub') userId: string,
  ) {
    return this.groupsService.updateGroup(groupId, body, userId);
  }
}
