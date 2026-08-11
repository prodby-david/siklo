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
import { JwtAuthGuard } from '@/commons/guards/jwt-auth';
import { CurrentUser } from '@/commons/decorators/current-user.decorator';
import { ZodValidationPipe } from '@/commons/pipes/zod-validation.pipes';
import { GroupsService } from './groups.service';
import { createGroupSchema } from './schema/create-group.schema';
import { joinGroupBodySchema } from './schema/join-group.schema';
import {
  updateGroupSchema,
  submitPaymentSchema,
  rejectPaymentSchema,
  updateMemberPaymentPreferenceSchema,
  type UpdateGroupDTO,
  type SubmitPaymentDTO,
  type RejectPaymentDTO,
  type UpdateMemberPaymentPreferenceDTO,
} from '@siklo/shared-schemas';
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
  async getUserGroup(
    @CurrentUser('sub') userId: string,
    @Query('status') status?: string,
  ) {
    return this.groupsService.getUsersGroup(userId, status);
  }

  @Get('invite/:inviteCode')
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

  @Post('payments/submit')
  @UseGuards(JwtAuthGuard)
  async submitPayment(
    @Body(new ZodValidationPipe(submitPaymentSchema)) body: SubmitPaymentDTO,
    @CurrentUser('sub') userId: string,
  ) {
    return this.groupsService.submitPayment(body, userId);
  }

  @Post('payments/:paymentId/verify')
  @UseGuards(JwtAuthGuard)
  async verifyPayment(
    @Param('paymentId') paymentId: string,
    @CurrentUser('sub') userId: string,
  ) {
    return this.groupsService.verifyPayment(paymentId, userId);
  }

  @Post('payments/:paymentId/reject')
  @UseGuards(JwtAuthGuard)
  async rejectPayment(
    @Param('paymentId') paymentId: string,
    @Body(new ZodValidationPipe(rejectPaymentSchema)) body: RejectPaymentDTO,
    @CurrentUser('sub') userId: string,
  ) {
    return this.groupsService.rejectPayment(paymentId, body, userId);
  }

  @Patch(':id/members/payment-preference')
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

  @Get(':id/payments/pending')
  @UseGuards(JwtAuthGuard)
  async getPendingPayments(
    @Param('id') groupId: string,
    @CurrentUser('sub') userId: string,
  ) {
    return this.groupsService.getPendingPayments(groupId, userId);
  }

  @Get(':id/backup-fund/summary')
  @UseGuards(JwtAuthGuard)
  async getEqualBackupRefundSummary(
    @Param('id') groupId: string,
    @CurrentUser('sub') userId: string,
  ) {
    return this.groupsService.getEqualBackupRefundSummary(groupId, userId);
  }

  @Post(':id/mark-paid')
  @UseGuards(JwtAuthGuard)
  async markMemberPaid(
    @Param('id') groupId: string,
    @Body() body: { memberUserId: string; cycleNumber?: number },
    @CurrentUser('sub') userId: string,
  ) {
    return this.groupsService.markMemberPaid(
      groupId,
      body.memberUserId,
      userId,
      body.cycleNumber,
    );
  }

  @Post(':id/announcement')
  @UseGuards(JwtAuthGuard)
  async sendAnnouncement(
    @Param('id') groupId: string,
    @Body() body: { message: string },
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

  @Post(':id/select-slot')
  @UseGuards(JwtAuthGuard)
  async selectSlot(
    @Param('id') groupId: string,
    @Body() body: { position: number },
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
