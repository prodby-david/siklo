"use client";

import { useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";
import { useQueryClient } from "@tanstack/react-query";
import { url } from "@/shared/config/url";
import { ACTIVITY_QUERY_KEY } from "../constants/activity.constants";

export default function useGroupSocket(groupId: string) {
  const queryClient = useQueryClient();
  const socketRef = useRef<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    if (!groupId) return;

    const socket = io(url.websocket, {
      withCredentials: true,
      transports: ["websocket"],
    });

    socketRef.current = socket;

    socket.on("connect", () => {
      setIsConnected(true);
      socket.emit("join-group", groupId);
    });

    socket.on("disconnect", () => {
      setIsConnected(false);
    });

    socket.on("activity.created", () => {
      queryClient.invalidateQueries({
        queryKey: [ACTIVITY_QUERY_KEY, groupId],
      });
    });

    return () => {
      socket.disconnect();
      socketRef.current = null;
      setIsConnected(false);
    };
  }, [groupId, queryClient]);

  return { isConnected };
}
