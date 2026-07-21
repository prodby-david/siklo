import { getGroupActivities } from "../api/getGroupActivities";
import { useQuery } from "@tanstack/react-query";
import { ACTIVITY_QUERY_KEY } from "../constants/activity.constants";

export default function useGetGroupActivities(groupId: string) {
  return useQuery({
    queryKey: [ACTIVITY_QUERY_KEY, groupId],
    queryFn: () => getGroupActivities(groupId),
    enabled: !!groupId,
    staleTime: 1000 * 60 * 2,
    retry: 1,
  });
}
