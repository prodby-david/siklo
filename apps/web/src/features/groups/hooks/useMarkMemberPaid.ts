import { useMutation, useQueryClient } from "@tanstack/react-query";
import { markMemberPaid } from "../api/markMemberPaid";
import { ACTIVITY_QUERY_KEY } from "../constants/activity.constants";

export function useMarkMemberPaid(groupId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({
      memberUserId,
      cycleNumber,
    }: {
      memberUserId: string;
      cycleNumber?: number;
    }) => markMemberPaid(groupId, memberUserId, cycleNumber),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ACTIVITY_QUERY_KEY, groupId],
      });
      queryClient.invalidateQueries({
        queryKey: ["group", groupId],
      });
    },
  });
}
