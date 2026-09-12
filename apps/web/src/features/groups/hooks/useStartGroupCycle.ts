import { useMutation, useQueryClient } from "@tanstack/react-query";
import { startGroupCycle } from "../api/startGroupCycle";
import { ACTIVITY_QUERY_KEY } from "../constants/activity.constants";

export default function useStartGroupCycle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (groupId: string) => startGroupCycle(groupId),
    onSuccess: async (_, groupId) => {
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
