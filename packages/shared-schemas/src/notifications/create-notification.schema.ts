import { z } from "zod";
import { notificationTypeSchema } from "../enums/notification-type.js";

export const notificationSchema = z.object({
  id: z.string(),
  userId: z.string(),
  groupId: z.string(),
  notificationType: notificationTypeSchema,
  description: z.string(),
  isRead: z.boolean(),
  createdAt: z.union([z.string(), z.date()]),
});

export type NotificationDTO = z.infer<typeof notificationSchema>;

export const createNotificationSchema = notificationSchema.pick({
  userId: true,
  groupId: true,
  notificationType: true,
  description: true,
});

export type CreateNotificationDTO = z.infer<typeof createNotificationSchema>;

export const markNotificationReadSchema = z.object({
  notificationId: z.string().min(1, "Notification ID is required"),
});

export type MarkNotificationReadDTO = z.infer<
  typeof markNotificationReadSchema
>;
