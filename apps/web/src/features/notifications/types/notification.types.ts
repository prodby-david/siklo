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

export interface NotificationSheetProps {
  isOpen: boolean;
  onClose: () => void;
}

export interface NotificationEmptyStateProps {
  filter?: string;
}

export interface NotificationHeaderProps {
  unreadCount: number;
  filter: NotificationFilter;
  setFilter: (filter: NotificationFilter) => void;
  onMarkAllAsRead?: () => void;
  onClose: () => void;
}

export interface NotificationItemCardProps {
  item: NotificationItem;
  onMarkAsRead: (id: string) => void;
  onDelete: (id: string) => void;
  onCloseDrawer: () => void;
}

export interface NotificationLoadMoreProps {
  totalCount: number;
  visibleCount: number;
  isExpanded: boolean;
  onToggleExpand: () => void;
}
