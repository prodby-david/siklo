import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteGroup } from "../api/deleteGroup";

export default function useDeleteGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: deleteGroup,
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["groups"] }),
        queryClient.invalidateQueries({ queryKey: ["nearest-due"] }),
      ]);
    },
  });
}
