import { useQuery } from "@tanstack/react-query";
import { getCurrentUser } from "../api";

export function useCurrentUser() {
  const {
    data,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
  });

  return {
    user: data,
    error,
    isLoading,
  };
}
