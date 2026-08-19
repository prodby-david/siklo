"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateGroup } from "../api/updateGroup";

export function useUpdateGroupDescription(groupId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (description: string) => updateGroup(groupId, { description }),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups", groupId] });
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });
}
