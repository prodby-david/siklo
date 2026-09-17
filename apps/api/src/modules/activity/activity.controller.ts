import {
  Controller,
  Get,
  Param,
  ParseUUIDPipe,
  UseGuards,
} from '@nestjs/common';
import { ActivityService } from './activity.service';
import { JwtAuthGuard } from '@/commons/guards/jwt-auth.guard';
import { CurrentUser } from '@/commons/decorators/current-user.decorator';

@Controller('groups/:groupId/activities')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get()
  @UseGuards(JwtAuthGuard)
  async getGroupActivities(
    @Param('groupId', ParseUUIDPipe) groupId: string,
    @CurrentUser('sub') userId: string,
  ) {
    return this.activityService.getGroupActivities(groupId, userId);
  }
}
