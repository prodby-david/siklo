import { useQuery } from "@tanstack/react-query";
import { getCurrentUserName } from "../api/getCurrentUserName";

export function useGetCurrentName() {
  return useQuery({
    queryKey: ["current-name"],
    queryFn: getCurrentUserName,
  });
}
