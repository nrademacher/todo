import { useCurrentUser, useTodos } from "../../hooks";
import { nanoid } from "nanoid";

import CircularProgress from "@mui/material/CircularProgress";
import List from "@mui/material/List";

import { TodoItem } from "./TodoItem";

export const TodoList: React.FC = () => {
  const { user } = useCurrentUser();
  const { todos, errors, isQueryLoading } = useTodos();

  if (todos === null || user === null) {
    return null;
  }

  if (errors.queryError !== null) {
    return <div>Error</div>;
  }

  if (isQueryLoading) {
    return <CircularProgress />;
  }

  return (
    <div style={{ width: "100%" }}>
      <h2>Todos</h2>
      <List sx={{ width: "100%" }}>
        {todos.map((todo) => {
          const localId = nanoid();
          return <TodoItem key={localId} localId={localId} todo={todo} />;
        })}
      </List>
    </div>
  );
};
