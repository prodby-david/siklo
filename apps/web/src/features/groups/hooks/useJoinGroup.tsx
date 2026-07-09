import { useMutation, useQueryClient } from "@tanstack/react-query";
import { joinGroup } from "../api/joinGroup";

export default function useJoinGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: joinGroup,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["groups"] });
    },
  });
}
