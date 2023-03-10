import type { Todo, TodoId } from "../../api";
import { useState } from "react";
import { useTodos } from "../../hooks";
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
import { EditTodoModal } from "./EditTodoModal";

interface ITodoItem {
  localId: string;
  todo: Todo;
}

export const TodoItem: React.FC<ITodoItem> = ({ localId, todo }) => {
  const [isEditorOpen, setIsEditorOpen] = useState(false);
  const { isUpdateMutationLoading, isRemoveMutationLoading, update, remove } =
    useTodos();

  function handleOpenEditor(): void {
    setIsEditorOpen(true);
  }

  function handleCloseEditor(): void {
    setIsEditorOpen(false);
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
    <>
      <ListItem sx={{ px: 0, pt: 0, pb: 1 }}>
        <Paper sx={{ width: "100%", py: 1.5, px: 2 }}>
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
                primary={todo.title}
                secondary={todo.description}
                role="todo-text"
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
      {isEditorOpen ? (
        <EditTodoModal
          isModalOpen={isEditorOpen}
          closeModal={handleCloseEditor}
          todo={todo}
        />
      ) : null}
    </>
  );
};
