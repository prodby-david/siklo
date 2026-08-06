import {
  NotificationItem,
  NotificationFilter,
} from "../types/notification.types";

export const INITIAL_NOTIFICATIONS: NotificationItem[] = [
  {
    id: "notif-1",
    title: "Monthly Contribution Due Soon",
    message:
      "Your contribution of ₱1,000 for 'Family Savings Circle' is due in 2 days.",
    category: "PAYMENT",
    createdAt: "10 mins ago",
    isRead: false,
    actionUrl: "/group",
    actionLabel: "View Group",
  },
  {
    id: "notif-2",
    title: "Payout Disbursed Successfully",
    message:
      "Your turn payout of ₱5,000 for 'Bayanihan Circle 2026' has been sent to your account.",
    category: "PAYOUT",
    createdAt: "2 hours ago",
    isRead: false,
    actionUrl: "/group",
    actionLabel: "View Payout",
  },
  {
    id: "notif-3",
    title: "New Organizer Announcement",
    message:
      "Organizer posted a new message in 'Office Paluwagan': Next turn rotation starts on Monday.",
    category: "ANNOUNCEMENT",
    createdAt: "1 day ago",
    isRead: false,
    actionUrl: "/group",
    actionLabel: "Read Announcement",
  },
  {
    id: "notif-4",
    title: "Security Update",
    message: "Your payout settings were updated successfully.",
    category: "SYSTEM",
    createdAt: "3 days ago",
    isRead: true,
  },
];

export const NOTIFICATION_FILTERS: { id: NotificationFilter; label: string }[] =
  [
    { id: "ALL", label: "All" },
    { id: "UNREAD", label: "Unread" },
    { id: "PAYMENT", label: "Payments" },
    { id: "ANNOUNCEMENT", label: "Announcements" },
  ];
