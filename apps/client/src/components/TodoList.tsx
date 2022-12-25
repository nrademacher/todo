import { useCurrentUser, useTodos } from "../hooks";
import { nanoid } from "nanoid";
import { TodoItem } from "./TodoItem";

export const TodoList: React.FC = () => {
  const { user } = useCurrentUser();
  const { todos, error, isLoading } = useTodos();

  if (!todos || !user) {
    return null;
  }

  if (error) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <ol>
      {todos.map((todo) => {
        const localId = nanoid();
        return (
          <li key={localId}>
            <TodoItem localId={localId} todo={todo} />
          </li>
        );
      })}
    </ol>
  );
};
