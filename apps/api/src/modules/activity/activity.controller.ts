import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { ActivityService } from './activity.service';
import { JwtAuthGuard } from '@/commons/guards/jwt-auth';

@Controller('activity')
export class ActivityController {
  constructor(private readonly activityService: ActivityService) {}

  @Get(':groupId')
  @UseGuards(JwtAuthGuard)
  async getGroupActivities(@Param('groupId') groupId: string) {
    return this.activityService.getGroupActivities(groupId);
  }
}
