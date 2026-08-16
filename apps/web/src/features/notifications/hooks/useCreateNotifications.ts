import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { CreateNotificationDTO } from "@siklo/shared-schemas";
import { createNotification } from "../api/createNotification";

export const useCreateNotification = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data: CreateNotificationDTO) => createNotification(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
    },
  });
};
