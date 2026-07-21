import { ApiActivity, LogEvent } from "../types/group.activity.types";
import {
  ACTIVITY_TYPE_CONFIG,
  type ActivityConfig,
} from "@/features/groups/constants/activity.constants";
import { Activity } from "lucide-react";

export function mapApiActivitiesToEvents(
  activities: ApiActivity[],
): LogEvent[] {
  return activities.map((a) => {
    const config: ActivityConfig | undefined = ACTIVITY_TYPE_CONFIG[a.activity];
    const Icon = config?.icon ?? Activity;
    const iconColor =
      config?.iconColor ??
      "text-neutral-500 bg-neutral-500/10 border-neutral-500/20";

    return {
      id: a.id,
      type: a.activity,
      text: a.description,
      date: new Date(a.createdAt),
      icon: Icon,
      iconColor,
    };
  });
}
