import { getGroups } from "../api/getGroups";
import { useQuery } from "@tanstack/react-query";

export default function useGetGroup() {
  return useQuery({
    queryKey: ["groups"],
    queryFn: () => getGroups(),
    staleTime: 1000 * 60 * 5,
    retry: 1,
  });
}
