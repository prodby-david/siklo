"use client";

import { useEffect, useState } from "react";
import { io } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";
import { url } from "@/shared/config/url";
import { ACTIVITY_QUERY_KEY } from "../constants/activity.constants";
import { PAYMENT_QUERY_KEYS } from "@/features/payments/constants/payment.constants";

export default function useGroupSocket(groupId: string) {
  const queryClient = useQueryClient();
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!groupId) return;

    const socket = io(url.websocket, {
      withCredentials: true,
      transports: ["websocket"],
    });

    const refreshGroup = () => {
      void queryClient.invalidateQueries({
        queryKey: [ACTIVITY_QUERY_KEY, groupId],
      });
      void queryClient.invalidateQueries({ queryKey: ["groups"] });
      void queryClient.invalidateQueries({
        queryKey: [PAYMENT_QUERY_KEYS.PENDING_PAYMENTS],
      });
      void queryClient.invalidateQueries({ queryKey: ["nearest-due"] });
    };

    socket.on("connect", () => {
      setIsConnected(true);
      socket.emit("join-group", groupId);
      refreshGroup();
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("activity.created", refreshGroup);

    return () => {
      socket.disconnect();
      setIsConnected(false);
    };
  }, [groupId, queryClient]);

  return { isConnected };
}
