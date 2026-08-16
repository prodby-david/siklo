"use client";

import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";
import type { NotificationDTO } from "@siklo/shared-schemas";
import { url } from "@/shared/config/url";

export function useNotificationSocket() {
  const queryClient = useQueryClient();
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(url.websocket, {
      withCredentials: true,
      transports: ["websocket"],
    });

    socketRef.current = socket;

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
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
    };
  }, [queryClient]);
}
