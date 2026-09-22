import { useQuery } from "@tanstack/react-query";
import { getUserPendingInvites } from "../api/getUserPendingInvites";

export function useGetUserPendingInvites() {
  return useQuery({
    queryKey: ["pending-invites"],
    queryFn: getUserPendingInvites,
  });
}
