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

  function onMutationSuccess(): void {
    queryClient.invalidateQueries({ queryKey: ["todos"] });
  }

  const add = useMutation({
    mutationFn: createTodo,
    onSuccess: onMutationSuccess,
  });

  const update = useMutation({
    mutationFn: updateTodo,
    onSuccess: onMutationSuccess,
  });

  const remove = useMutation({
    mutationFn: deleteTodo,
    onSuccess: () => {
      setTimeout(onMutationSuccess, 500);
    },
  });

  return {
    todos: data,
    error: error || add.error || update.error || remove.error,
    isLoading: isLoading || add.isLoading || update.isLoading ||
      remove.isLoading,
    add: add.mutateAsync,
    update: update.mutateAsync,
    remove: remove.mutateAsync,
  };
}
