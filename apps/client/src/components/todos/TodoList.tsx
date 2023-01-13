import { useCurrentUser, useTodos } from "../../hooks";
import { nanoid } from "nanoid";

import List from "@mui/material/List";

import { TodoItem } from "./TodoItem";

export const TodoList: React.FC = () => {
  const { user } = useCurrentUser();
  const { todos, errors, isLoading } = useTodos();

  if (todos === null || user === null) {
    return null;
  }

  if (errors.queryError !== null) {
    return <div>Error</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <h2>Todos</h2>
      <List>
        {todos.map((todo) => {
          const localId = nanoid();
          return <TodoItem key={localId} localId={localId} todo={todo} />;
        })}
      </List>
    </>
  );
};
