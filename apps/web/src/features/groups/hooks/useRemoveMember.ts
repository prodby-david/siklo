"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { removeMember } from "../api/removeMember";

export function useRemoveMember(groupId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (memberUserId: string) => removeMember(groupId, memberUserId),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups", groupId] });
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });
}
