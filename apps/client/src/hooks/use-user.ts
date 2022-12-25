import { useQuery } from "@tanstack/react-query";
import { getUserById, User } from "../api";

export function useUser(id: User["id"]) {
  const {
    data,
    error,
    isLoading,
  } = useQuery({
    queryKey: [`user-${id}`],
    queryFn: () => getUserById(id),
  });

  return {
    user: data,
    error,
    isLoading,
  };
}
