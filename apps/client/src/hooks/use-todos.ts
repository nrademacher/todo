import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { createTodo, deleteTodo, getTodos, updateTodo } from "../api";

export function useTodos() {
  const queryClient = useQueryClient();

  const {
    data,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  const add = useMutation({
    mutationFn: createTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const update = useMutation({
    mutationFn: updateTodo,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["todos"] });
    },
  });

  const remove = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      setTimeout(
        () => queryClient.invalidateQueries({ queryKey: ["todos"] }),
        500,
      );
    },
  });

  return {
    todos: data,
    error,
    isLoading,
    add,
    update,
    remove,
  };
}
