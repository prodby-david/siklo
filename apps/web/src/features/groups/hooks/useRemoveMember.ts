"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeMember } from "../api/removeMember";
import { ACTIVITY_QUERY_KEY } from "../constants/activity.constants";

export function useRemoveMember(groupId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (memberUserId: string) => removeMember(groupId, memberUserId),

    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["groups"] }),
        queryClient.invalidateQueries({
          queryKey: [ACTIVITY_QUERY_KEY, groupId],
        }),
        queryClient.invalidateQueries({ queryKey: ["nearest-due"] }),
      ]);
    },
  });
}
