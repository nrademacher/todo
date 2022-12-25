import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api";

export function useUsers() {
  const {
    data,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["users"],
    queryFn: getUsers,
  });

  return {
    users: data,
    error,
    isLoading,
  };
}
