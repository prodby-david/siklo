import type { NotificationFilter } from "../types/notification.types";

export const NOTIFICATION_FILTERS: { id: NotificationFilter; label: string }[] =
  [
    { id: "ALL", label: "All" },
    { id: "UNREAD", label: "Unread" },
    { id: "PAYMENT", label: "Payments" },
    { id: "ANNOUNCEMENT", label: "Announcements" },
  ];
