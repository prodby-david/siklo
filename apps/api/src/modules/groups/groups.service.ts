import { Injectable } from '@nestjs/common';
import {
  CreateGroupDTO as CreateGroupData,
  JoinGroupBodyDTO,
  UpdateMemberPaymentPreferenceDTO,
  UpdateGroupDTO,
} from '@siklo/shared-schemas';
import { GroupsCoreService } from './services/groups-core.service';
import { GroupsMembersService } from './services/groups-members.service';
import { GroupsTurnsService } from './services/groups-turns.service';

@Injectable()
export class GroupsService {
  constructor(
    private readonly groupsCoreService: GroupsCoreService,
    private readonly groupsMembersService: GroupsMembersService,
    private readonly groupsTurnsService: GroupsTurnsService,
  ) {}

  async createGroup(dto: CreateGroupData, userId: string) {
    return this.groupsCoreService.createGroup(dto, userId);
  }

  async joinGroup(dto: JoinGroupBodyDTO, userId: string) {
    return this.groupsMembersService.joinGroup(dto, userId);
  }

  async getUsersGroup(userId: string, status?: string) {
    return this.groupsCoreService.getUsersGroup(userId, status);
  }

  async getGroupById(groupId: string, userId: string) {
    return this.groupsCoreService.getGroupById(groupId, userId);
  }

  async startGroupCycle(groupId: string, userId: string) {
    return this.groupsCoreService.startGroupCycle(groupId, userId);
  }

  async getGroupByInviteCodePreview(inviteCode: string) {
    return this.groupsCoreService.getGroupByInviteCodePreview(inviteCode);
  }

  async updateMemberPaymentPreference(
    groupId: string,
    dto: UpdateMemberPaymentPreferenceDTO,
    userId: string,
  ) {
    return this.groupsMembersService.updateMemberPaymentPreference(
      groupId,
      dto,
      userId,
    );
  }

  async sendAnnouncement(
    groupId: string,
    message: string,
    organizerUserId: string,
  ) {
    return this.groupsTurnsService.sendAnnouncement(
      groupId,
      message,
      organizerUserId,
    );
  }

  async removeMember(
    groupId: string,
    memberUserId: string,
    organizerUserId: string,
  ) {
    return this.groupsMembersService.removeMember(
      groupId,
      memberUserId,
      organizerUserId,
    );
  }

  async selectSlot(groupId: string, position: number, userId: string) {
    return this.groupsTurnsService.selectSlot(groupId, position, userId);
  }

  async deleteGroup(groupId: string, userId: string) {
    return this.groupsCoreService.deleteGroup(groupId, userId);
  }

  async updateGroup(groupId: string, dto: UpdateGroupDTO, userId: string) {
    return this.groupsCoreService.updateGroup(groupId, dto, userId);
  }
}
