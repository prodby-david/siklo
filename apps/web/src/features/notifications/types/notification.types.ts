export type NotificationCategory = "PAYMENT" | "PAYOUT" | "ANNOUNCEMENT" | "SYSTEM";

export type NotificationFilter = "ALL" | "UNREAD" | "PAYMENT" | "ANNOUNCEMENT";

export interface NotificationItem {
  id: string;
  title: string;
  message: string;
  category: NotificationCategory;
  createdAt: string;
  isRead: boolean;
  actionUrl?: string;
  actionLabel?: string;
}

export interface UseNotificationsReturn {
  notifications: NotificationItem[];
  filter: NotificationFilter;
  setFilter: (filter: NotificationFilter) => void;
  unreadCount: number;
  markAsRead: (id: string) => void;
  markAllAsRead: () => void;
  deleteNotification: (id: string) => void;
}
