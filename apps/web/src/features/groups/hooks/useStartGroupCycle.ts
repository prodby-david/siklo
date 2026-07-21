import { useMutation, useQueryClient } from "@tanstack/react-query";
import { startGroupCycle } from "../api/startGroupCycle";

export default function useStartGroupCycle() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (groupId: string) => startGroupCycle(groupId),
    onSuccess: (_, groupId) => {
      queryClient.invalidateQueries({ queryKey: ["groups", groupId] });
    },
  });
}
