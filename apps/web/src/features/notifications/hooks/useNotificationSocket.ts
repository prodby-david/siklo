"use client";

import { useEffect } from "react";
import { io } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";
import type { NotificationDTO } from "@siklo/shared-schemas";
import { url } from "@/shared/config/url";
import { ACTIVITY_QUERY_KEY } from "@/features/groups/constants/activity.constants";
import { PAYMENT_QUERY_KEYS } from "@/features/payments/constants/payment.constants";

export function useNotificationSocket() {
  const queryClient = useQueryClient();

  useEffect(() => {
    const socket = io(url.websocket, {
      withCredentials: true,
      transports: ["websocket"],
    });

    socket.on("connect", () => {
      void queryClient.invalidateQueries({ queryKey: ["notifications"] });
      void queryClient.invalidateQueries({ queryKey: ["groups"] });
      void queryClient.invalidateQueries({
        queryKey: [PAYMENT_QUERY_KEYS.PENDING_PAYMENTS],
      });
      void queryClient.invalidateQueries({ queryKey: ["nearest-due"] });
    });

    socket.on("notification.created", (newNotification: NotificationDTO) => {
      queryClient.setQueryData<NotificationDTO[]>(
        ["notifications"],
        (old = []) => {
          const filtered = old.filter(
            (item) => item.id !== newNotification.id,
          );
          return [newNotification, ...filtered];
        },
      );

      void queryClient.invalidateQueries({ queryKey: ["notifications"] });
      void queryClient.invalidateQueries({ queryKey: ["groups"] });
      void queryClient.invalidateQueries({
        queryKey: [ACTIVITY_QUERY_KEY, newNotification.groupId],
      });
      void queryClient.invalidateQueries({
        queryKey: [PAYMENT_QUERY_KEYS.PENDING_PAYMENTS],
      });
      void queryClient.invalidateQueries({ queryKey: ["nearest-due"] });
    });

    return () => {
      socket.disconnect();
    };
  }, [queryClient]);
}
