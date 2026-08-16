import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  markNotificationReadApi,
  markAllNotificationsReadApi,
} from "../api/markNotificationsRead";

export function useMarkNotificationsRead() {
  const queryClient = useQueryClient();

  const markAsReadMutation = useMutation({
    mutationFn: markNotificationReadApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  const markAllAsReadMutation = useMutation({
    mutationFn: markAllNotificationsReadApi,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });

  return {
    markAsRead: markAsReadMutation.mutate,
    markAllAsRead: markAllAsReadMutation.mutate,
  };
}
