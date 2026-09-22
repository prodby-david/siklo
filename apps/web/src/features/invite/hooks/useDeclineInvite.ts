import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { declineInvite } from "../api/declineInvite";
import { getApiErrorMessage } from "@/shared/utils/error.helper";

export default function useDeclineInvite() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (inviteId: string) => declineInvite(inviteId),
    onSuccess: async () => {
      toast.success("Invitation declined");
      await queryClient.invalidateQueries({ queryKey: ["pending-invites"] });
    },
    onError: (error: unknown) => {
      toast.error(getApiErrorMessage(error, "Failed to decline invitation"));
    },
  });
}
