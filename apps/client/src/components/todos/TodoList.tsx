import { useCurrentUser, useTodos } from "../../hooks";
import { nanoid } from "nanoid";
import { List } from "@mui/material";
import { TodoItem } from "./TodoItem";
import { ErrorAlert } from "../ErrorAlert";
import { PageLoadingSpinner } from "../PageLoadingSpinner";

export const TodoList: React.FC = () => {
  const { user } = useCurrentUser();
  const { todos, errors, isQueryLoading } = useTodos();

  if (todos === null || user === null) {
    return null;
  }

  if (isQueryLoading) {
    return <PageLoadingSpinner />;
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
      {errors.queryError !== null && (
        <ErrorAlert
          message={{
            title: "Error",
            description:
              "An error occurred while retrieving your Todos. Please try again later.",
          }}
        />
      )}
    </div>
  );
};
