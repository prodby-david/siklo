import { Injectable } from '@nestjs/common';
import { prepareGroupCreationTool } from '../../groups/ai/create-group.tool';

@Injectable()
export class AiToolRegistry {
  getTools() {
    return {
      prepareGroupCreation: prepareGroupCreationTool(),
    };
  }
}
