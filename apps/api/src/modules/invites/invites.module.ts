import { Module } from '@nestjs/common';
import { InvitesController } from './invites.controller';
import { GroupsModule } from '../groups/groups.module';
import { UsersModule } from '../users/users.module';
import { InvitesRepository } from './invites.repository';
import { InvitesService } from './invites.service';

@Module({
  imports: [GroupsModule, UsersModule],
  controllers: [InvitesController],
  providers: [InvitesRepository, InvitesService],
  exports: [InvitesService],
})
export class InvitesModule {}
