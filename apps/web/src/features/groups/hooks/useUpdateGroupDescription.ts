"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { api } from "@/shared/lib/axios";

export function useUpdateGroupDescription(groupId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (description: string) => {
      const res = await api.patch(`/groups/${groupId}`, { description });
      return res.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups", groupId] });
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });
}
