import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { createInvite } from "../api/createInvite";
import type { CreateInviteDTO } from "@siklo/shared-schemas";
import { getApiErrorMessage } from "@/shared/utils/error.helper";

export default function useCreateInvite(groupId: string) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateInviteDTO) => createInvite(data),
    onSuccess: async () => {
      toast.success("Invitation sent successfully!");
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["group", groupId] }),
        queryClient.invalidateQueries({ queryKey: ["invites", groupId] }),
      ]);
    },
    onError: (error: unknown) => {
      toast.error(getApiErrorMessage(error, "Failed to send invitation"));
    },
  });
}
