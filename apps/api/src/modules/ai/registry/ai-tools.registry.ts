import { Injectable } from '@nestjs/common';
import { GroupsService } from '../../groups/groups.service';
import { createGroupTool } from '../../groups/ai/create-group.tool';

@Injectable()
export class AiToolRegistry {
  constructor(private readonly groupsService: GroupsService) {}

  getTools(userId: string) {
    return {
      createGroup: createGroupTool(this.groupsService, userId),
    };
  }
}
