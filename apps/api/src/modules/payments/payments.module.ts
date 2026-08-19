import { Module } from '@nestjs/common';
import { PaymentsController } from './payments.controller';
import { PaymentsService } from './payments.service';
import { PaymentsRepository } from './payments.repository';
import { PaymentsSubmissionService } from './services/payments-submission.service';
import { PaymentsManagementService } from './services/payments-management.service';
import { PaymentsScheduleService } from './services/payments-schedule.service';
import { PaymentsPayoutService } from './services/payments-payout.service';
import { ActivityModule } from '../activity/activity.module';
import { GroupsModule } from '../groups/groups.module';
import { NotificationsModule } from '../notifications/notifications.module';
import { WebsocketModule } from '../websocket/websocket.module';

@Module({
  imports: [ActivityModule, GroupsModule, NotificationsModule, WebsocketModule],
  controllers: [PaymentsController],
  providers: [
    PaymentsService,
    PaymentsRepository,
    PaymentsSubmissionService,
    PaymentsManagementService,
    PaymentsScheduleService,
    PaymentsPayoutService,
  ],
  exports: [
    PaymentsService,
    PaymentsSubmissionService,
    PaymentsManagementService,
    PaymentsScheduleService,
    PaymentsPayoutService,
  ],
})
export class PaymentsModule {}
