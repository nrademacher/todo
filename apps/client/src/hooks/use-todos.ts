import {
  type UseMutateAsyncFunction,
  useMutation,
  useQuery,
  useQueryClient,
} from "@tanstack/react-query";
import {
  createTodo,
  type CreateTodoParams,
  deleteTodo,
  getTodos,
  type Todo,
  updateTodo,
  type UpdateTodoParams,
} from "../api";

interface UseTodosResult {
  todos: Todo[] | null;
  errors: {
    queryError: unknown;
    createError: unknown;
    updateError: unknown;
    removeError: unknown;
  };
  isLoading: boolean;
  add: UseMutateAsyncFunction<void, unknown, CreateTodoParams, unknown>;
  update: UseMutateAsyncFunction<void, unknown, UpdateTodoParams, unknown>;
  remove: UseMutateAsyncFunction<void, unknown, number, unknown>;
}

export function useTodos(): UseTodosResult {
  const queryClient = useQueryClient();

  const {
    data,
    error: queryError,
    isLoading,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: getTodos,
  });

  async function onMutationSuccess(): Promise<void> {
    await queryClient.invalidateQueries({ queryKey: ["todos"] });
  }

  const create = useMutation({
    mutationFn: createTodo,
    onSuccess: onMutationSuccess,
  });

  const update = useMutation({
    mutationFn: updateTodo,
    onSuccess: onMutationSuccess,
  });

  const remove = useMutation({
    mutationFn: deleteTodo,
    onSuccess: onMutationSuccess,
  });

  return {
    todos: typeof data === "undefined" ? null : data,
    errors: {
      queryError,
      createError: create.error,
      updateError: update.error,
      removeError: remove.error,
    },
    isLoading:
      isLoading || create.isLoading || update.isLoading || remove.isLoading,
    add: create.mutateAsync,
    update: update.mutateAsync,
    remove: remove.mutateAsync,
  };
}
