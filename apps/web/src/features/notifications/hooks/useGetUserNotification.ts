import { getUserNotifications } from "../api/getUserNotification";
import { useQuery } from "@tanstack/react-query";

export const useGetUserNotification = () => {
  return useQuery({
    queryKey: ["notifications"],
    queryFn: getUserNotifications,
  });
};
