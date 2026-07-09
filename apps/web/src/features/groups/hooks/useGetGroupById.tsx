import { getGroupById } from "../api/getGroupsById";
import { useQuery } from "@tanstack/react-query";

export default function useGetGroupById(id: string) {
  return useQuery({
    queryKey: ["groups", id],
    queryFn: () => getGroupById(id),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}
