import { Group } from "@/features/groups/types/group.types";

export type { Group };

export interface ExtendedGroup extends Group {
  description?: string;
  totalPayout?: number;
  _count?: {
    memberships: number;
  };
}
