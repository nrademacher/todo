import { useTodos } from "../hooks";
import { nanoid } from "nanoid";
import { TodoItem } from "./TodoItem";

export const TodoList: React.FC = () => {
  const { todos, error, isLoading } = useTodos();

  if (!todos) {
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
        return <TodoItem localId={localId} todo={todo} />;
      })}
    </ol>
  );
};
