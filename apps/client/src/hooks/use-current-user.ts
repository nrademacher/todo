import { useQuery } from "@tanstack/react-query";
import { getCurrentUser, type User } from "../api";

interface UseCurrentUserResult {
  user: User | null;
  error: unknown;
  isLoading: boolean;
  isSuccess: boolean;
}

export function useCurrentUser(): UseCurrentUserResult {
  const { data, error, isLoading, isSuccess } = useQuery({
    queryKey: ["current-user"],
    queryFn: getCurrentUser,
  });

  return {
    user: typeof data === "undefined" ? null : data,
    error,
    isLoading,
    isSuccess,
  };
}
