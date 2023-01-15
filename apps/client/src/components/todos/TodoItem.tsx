import type { Todo, TodoId } from "../../api";
import { useTodos } from "../../hooks";

import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import Paper from "@mui/material/Paper";
import Stack from "@mui/material/Stack";
import Checkbox from "@mui/material/Checkbox";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import CircularProgress from "@mui/material/CircularProgress";
import { Box } from "@mui/material";

export const TodoItem: React.FC<{ localId: string; todo: Todo }> = ({
  localId,
  todo,
}) => {
  const { isUpdateMutationLoading, update, remove } = useTodos();

  async function handleCheckedChange(
    todoId: TodoId,
    checked: boolean,
  ): Promise<void> {
    const updateTodoParams = {
      done: checked,
    };
    await update({ id: todoId, payload: updateTodoParams });
  }

  async function handleDelete(todoId: TodoId): Promise<void> {
    await remove(todoId);
  }

  return (
    <ListItem sx={{ paddingLeft: 0, paddingRight: 0 }}>
      <Paper sx={{ width: "100%", padding: "1rem" }}>
        <Stack
          direction="row"
          sx={{ alignItems: "center", justifyContent: "space-between" }}
        >
          <Stack direction="row" spacing={1} sx={{ alignItems: "center" }}>
            <Box sx={{ m: 1, position: "relative" }}>
              <Checkbox
                id={localId}
                data-testid={localId + "-input"}
                role="todo-checkbox"
                onChange={async (e) =>
                  await handleCheckedChange(todo.id, e.target.checked)}
                edge="start"
                checked={todo.done}
                tabIndex={-1}
                disableRipple
                disabled={isUpdateMutationLoading}
                inputProps={{ "aria-labelledby": localId + "-label" }}
              />
              {isUpdateMutationLoading && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: "absolute",
                    top: "20%",
                    left: "-10%",
                  }}
                />
              )}
            </Box>
            <ListItemText
              id={localId + "-label"}
              primary={todo.description}
              role="todo-description"
            />
          </Stack>
          <IconButton
            size="small"
            aria-label="delete"
            onClick={async () => await handleDelete(todo.id)}
            data-testid={localId + "-button"}
          >
            <DeleteIcon />
          </IconButton>
        </Stack>
      </Paper>
    </ListItem>
  );
};
