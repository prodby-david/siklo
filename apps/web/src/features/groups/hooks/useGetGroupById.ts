import { getGroupById } from "../api/getGroupsById";
import { useQuery } from "@tanstack/react-query";

export default function useGetGroupById(id?: string) {
  return useQuery({
    queryKey: ["groups", id],
    queryFn: () => getGroupById(id!),
    enabled: Boolean(id && id !== "undefined"),
    staleTime: 5000,
    retry: 1,
  });
}
