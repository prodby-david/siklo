import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { acceptInvite } from "../api/acceptInvite";
import { getApiErrorMessage } from "@/shared/utils/error.helper";

export default function useAcceptInvite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (inviteId: string) => acceptInvite(inviteId),
    onSuccess: async () => {
      toast.success("Invitation accepted successfully!");
      await Promise.all([
        queryClient.invalidateQueries({ queryKey: ["pending-invites"] }),
        queryClient.invalidateQueries({ queryKey: ["user-groups"] }),
        queryClient.invalidateQueries({ queryKey: ["groups"] }),
      ]);
    },
    onError: (error: unknown) => {
      toast.error(getApiErrorMessage(error, "Failed to accept invitation"));
    },
  });
}
