import type { NotificationDTO } from "@siklo/shared-schemas";
import type {
  NotificationItem,
  NotificationCategory,
} from "../types/notification.types";
import { formatRelativeDate } from "@/shared/utils/formatDate";

function mapCategory(type: string): NotificationCategory {
  switch (type) {
    case "PAYMENT":
      return "PAYMENT";
    case "PAYOUT":
      return "PAYOUT";
    case "ANNOUNCEMENT":
      return "ANNOUNCEMENT";
    case "SYSTEM":
    case "REMINDER":
    default:
      return "SYSTEM";
  }
}

function deriveTitle(type: string): string {
  switch (type) {
    case "PAYMENT":
      return "Payment Update";
    case "PAYOUT":
      return "Payout Received";
    case "ANNOUNCEMENT":
      return "Group Announcement";
    case "REMINDER":
      return "Payment Reminder";
    case "SYSTEM":
    default:
      return "System Notice";
  }
}

export function mapNotificationDtoToItem(
  dto: NotificationDTO,
): NotificationItem {
  const category = mapCategory(dto.notificationType);
  const title = deriveTitle(dto.notificationType);
  const createdAtFormatted = formatRelativeDate(dto.createdAt);

  return {
    id: dto.id,
    title,
    message: dto.description,
    category,
    createdAt: createdAtFormatted,
    isRead: dto.isRead,
    actionUrl: dto.groupId ? `/group/${dto.groupId}` : undefined,
    actionLabel: dto.groupId ? "View Group" : undefined,
  };
}
