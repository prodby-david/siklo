import { z } from "zod";

export const NOTIFICATION_TYPES = [
  "PAYMENT",
  "PAYOUT",
  "REMINDER",
  "ANNOUNCEMENT",
  "SYSTEM",
] as const;

export const NOTIFICATION_TYPE_LABELS: Record<
  (typeof NOTIFICATION_TYPES)[number],
  string
> = {
  PAYMENT: "Payment",
  PAYOUT: "Payout",
  REMINDER: "Reminder",
  ANNOUNCEMENT: "Announcement",
  SYSTEM: "System",
};

export const notificationTypeSchema = z.enum(NOTIFICATION_TYPES);

export type NotificationType = (typeof NOTIFICATION_TYPES)[number];
