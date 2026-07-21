import { api } from "@/shared/lib/axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useRouter } from "next/navigation";

export const useSignOut = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async () => {
      await api.post("/auth/signout");
    },
    onSettled: async () => {
      queryClient.clear();
      router.push("/");
    },
  });
};
