import { Module } from '@nestjs/common';
import { GroupsController } from './groups.controller';
import { GroupsService } from './groups.service';
import { GroupsRepository } from './groups.repository';
import { GroupsCoreService } from './services/groups-core.service';
import { GroupsMembersService } from './services/groups-members.service';
import { GroupsTurnsService } from './services/groups-turns.service';
import { ActivityModule } from '../activity/activity.module';
import { NotificationsModule } from '../notifications/notifications.module';

@Module({
  imports: [ActivityModule, NotificationsModule],
  controllers: [GroupsController],
  providers: [
    GroupsService,
    GroupsRepository,
    GroupsCoreService,
    GroupsMembersService,
    GroupsTurnsService,
  ],
  exports: [
    GroupsService,
    GroupsCoreService,
    GroupsMembersService,
    GroupsTurnsService,
  ],
})
export class GroupsModule {}
