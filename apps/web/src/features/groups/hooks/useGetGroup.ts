import { getGroups } from "../api/getGroups";
import { useQuery } from "@tanstack/react-query";

export default function useGetGroup(status?: string) {
  return useQuery({
    queryKey: status ? ["groups", status] : ["groups"],
    queryFn: () => getGroups(status),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}
