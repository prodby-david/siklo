import { useMutation, useQueryClient } from "@tanstack/react-query";
import { sendAnnouncement } from "../api/sendAnnouncement";
import { ACTIVITY_QUERY_KEY } from "../constants/activity.constants";

export function useSendAnnouncement(groupId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (message: string) => sendAnnouncement(groupId, message),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [ACTIVITY_QUERY_KEY, groupId],
      });
    },
  });
}
