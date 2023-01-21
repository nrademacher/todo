import type { Todo, TodoId } from "../../api";
import { useTodoEditor, useTodos } from "../../hooks";
import {
  Box,
  Checkbox,
  CircularProgress,
  IconButton,
  ListItem,
  ListItemText,
  Paper,
  Stack,
} from "@mui/material";
import { Delete as DeleteIcon, Edit as EditIcon } from "@mui/icons-material";

interface ITodoItem {
  localId: string;
  todo: Todo;
}

export const TodoItem: React.FC<ITodoItem> = ({ localId, todo }) => {
  const { isUpdateMutationLoading, isRemoveMutationLoading, update, remove } =
    useTodos();
  const { setEditorTodo, openEditor } = useTodoEditor();

  function handleOpenEditor(): void {
    setEditorTodo(todo);
    openEditor();
  }

  async function handleCheckedChange(
    todoId: TodoId,
    checked: boolean
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
            <Box sx={{ position: "relative" }}>
              <Checkbox
                id={localId}
                data-testid={localId + "-input"}
                role="todo-checkbox"
                onChange={async (e) =>
                  await handleCheckedChange(todo.id, e.target.checked)
                }
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
          <Stack direction="row" spacing={2}>
            <Box sx={{ position: "relative" }}>
              <IconButton
                size="small"
                aria-label="edit"
                onClick={handleOpenEditor}
                data-testid={localId + "-edit-button"}
                disabled={isUpdateMutationLoading}
              >
                <EditIcon />
              </IconButton>
              {isUpdateMutationLoading && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: "absolute",
                    top: "10%",
                    left: "15%",
                  }}
                />
              )}
            </Box>
            <Box sx={{ position: "relative" }}>
              <IconButton
                size="small"
                aria-label="delete"
                onClick={async () => await handleDelete(todo.id)}
                data-testid={localId + "-delete-button"}
                disabled={isRemoveMutationLoading}
              >
                <DeleteIcon />
              </IconButton>
              {isRemoveMutationLoading && (
                <CircularProgress
                  size={24}
                  sx={{
                    position: "absolute",
                    top: "10%",
                    left: "15%",
                  }}
                />
              )}
            </Box>
          </Stack>
        </Stack>
      </Paper>
    </ListItem>
  );
};
