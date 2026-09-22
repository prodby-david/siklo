import {
  Controller,
  Post,
  Get,
  Patch,
  Param,
  ParseUUIDPipe,
  Body,
  UseGuards,
} from '@nestjs/common';
import { CurrentUser } from '@/commons/decorators/current-user.decorator';
import { JwtAuthGuard } from '@/commons/guards/jwt-auth.guard';
import { ZodValidationPipe } from '@/commons/pipes/zod-validation.pipe';
import { InvitesService } from './invites.service';
import {
  createInviteSchema,
  type CreateInviteDTO,
} from '@siklo/shared-schemas';

@Controller('invites')
export class InvitesController {
  constructor(private readonly invitesService: InvitesService) {}

  @Post()
  @UseGuards(JwtAuthGuard)
  async createInvite(
    @CurrentUser('sub') userId: string,
    @Body(new ZodValidationPipe(createInviteSchema))
    createInviteDto: CreateInviteDTO,
  ) {
    return this.invitesService.createInvite(userId, createInviteDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard)
  async findUserPendingInvites(@CurrentUser('sub') userId: string) {
    return this.invitesService.findUserPendingInvites(userId);
  }

  @Patch(':id/accept')
  @UseGuards(JwtAuthGuard)
  async acceptInvite(
    @CurrentUser('sub') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.invitesService.acceptInvite(userId, id);
  }

  @Patch(':id/decline')
  @UseGuards(JwtAuthGuard)
  async declineInvite(
    @CurrentUser('sub') userId: string,
    @Param('id', ParseUUIDPipe) id: string,
  ) {
    return this.invitesService.declineInvite(userId, id);
  }
}
