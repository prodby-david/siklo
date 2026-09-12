import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateGroupData } from "../validator/create-group.validator";
import { createGroup } from "../api/createGroup";

export default function useCreateGroup() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateGroupData) => createGroup(data),
    onSuccess: async () => {
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["groups"] }),
        queryClient.invalidateQueries({ queryKey: ["nearest-due"] }),
      ]);
    },
  });
}
