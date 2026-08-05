"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/lib/axios";

export function useRemoveMember(groupId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (memberUserId: string) => {
      const res = await api.delete(`/groups/${groupId}/members/${memberUserId}`);
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups", groupId] });
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });
}
