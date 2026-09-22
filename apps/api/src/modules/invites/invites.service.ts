import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
  ForbiddenException,
} from '@nestjs/common';
import { CreateInviteDTO } from '@siklo/shared-schemas';
import { InvitesRepository } from './invites.repository';
import { GroupsService } from '../groups/groups.service';
import { UsersService } from '../users/users.service';

@Injectable()
export class InvitesService {
  constructor(
    private readonly invitesRepository: InvitesRepository,
    private readonly groupsService: GroupsService,
    private readonly userService: UsersService,
  ) {}

  private async getPendingInviteForInvitee(
    inviteId: string,
    inviteeId: string,
  ) {
    const invite = await this.invitesRepository.findInviteById(inviteId);

    if (!invite || invite.inviteeId !== inviteeId) {
      throw new NotFoundException('Invitation not found');
    }

    if (invite.status !== 'PENDING') {
      throw new ConflictException('Invitation is no longer pending');
    }

    return invite;
  }

  async createInvite(organizerId: string, dto: CreateInviteDTO) {
    const invitee = await this.userService.getUserByEmail(dto.email);

    if (organizerId === invitee.id) {
      throw new BadRequestException(
        "You can't send an invite request to yourself.",
      );
    }

    const group = await this.groupsService.getGroupForInvite(
      dto.groupId,
      organizerId,
    );

    if (!group) {
      throw new NotFoundException('Group not found');
    }

    if (group.organizerId !== organizerId) {
      throw new ForbiddenException('Only the organizer can invite members');
    }

    if (group.startDate) {
      throw new ConflictException(
        "You can't invite members to a group that has already started.",
      );
    }

    if (group.memberships.length >= group.maxMembers) {
      throw new ConflictException('Group has reached maximum member capacity');
    }

    const isAlreadyMember = group.memberships.some(
      (member) => member.userId === invitee.id,
    );

    if (isAlreadyMember) {
      throw new ConflictException(
        'This user is already a member of this group.',
      );
    }

    const existingInvite =
      await this.invitesRepository.findInviteByGroupAndInvitee(
        dto.groupId,
        invitee.id,
      );

    if (!existingInvite) {
      return this.invitesRepository.createInvite(organizerId, {
        groupId: dto.groupId,
        inviteeId: invitee.id,
      });
    }

    if (existingInvite.status === 'PENDING') {
      throw new ConflictException(
        'An invitation has already been sent to this user.',
      );
    }

    if (existingInvite.status === 'ACCEPTED') {
      throw new ConflictException('This invitation has already been accepted.');
    }

    return this.invitesRepository.updateInviteStatus(
      existingInvite.id,
      'PENDING',
    );
  }

  async acceptInvite(userId: string, inviteId: string) {
    await this.getPendingInviteForInvitee(inviteId, userId);

    return this.invitesRepository.updateInviteStatus(inviteId, 'ACCEPTED');
  }

  async declineInvite(userId: string, inviteId: string) {
    await this.getPendingInviteForInvitee(inviteId, userId);

    return this.invitesRepository.updateInviteStatus(inviteId, 'DECLINED');
  }

  async findUserPendingInvites(userId: string) {
    return this.invitesRepository.findUserPendingInvites(userId, 'PENDING');
  }
}
