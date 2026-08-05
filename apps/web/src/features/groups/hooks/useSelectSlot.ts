import { useMutation, useQueryClient } from "@tanstack/react-query";
import { selectSlot } from "../api/selectSlot";
import { ACTIVITY_QUERY_KEY } from "../constants/activity.constants";

export function useSelectSlot(groupId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (position: number) => selectSlot(groupId, position),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ACTIVITY_QUERY_KEY, groupId],
      });
      queryClient.invalidateQueries({
        queryKey: ["groups", groupId],
      });
      queryClient.invalidateQueries({
        queryKey: ["group", groupId],
      });
    },
  });
}
