import type { Todo } from "../../api";
import { useState } from "react";
import { useTodos } from "../../hooks";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
} from "@mui/material";

interface IEditTodoModal {
  isModalOpen: boolean;
  todo: Todo;
  closeModal: () => void;
}

export const EditTodoModal: React.FC<IEditTodoModal> = ({
  isModalOpen,
  closeModal,
  todo,
}) => {
  const [title, setTitle] = useState(todo.title);
  const [description, setDescription] = useState(todo.description);
  const { update } = useTodos();

  function handleCloseModal(): void {
    closeModal();
  }

  async function handleUpdate(): Promise<void> {
    const updateTodoParams = {
      title,
      description,
    };
    await update({ id: todo.id, payload: updateTodoParams });
    closeModal();
  }

  return (
    <Dialog open={isModalOpen} onClose={handleCloseModal} fullWidth>
      <DialogTitle>Edit Todo details</DialogTitle>
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await handleUpdate();
        }}
      >
        <Stack spacing={2}>
          <DialogContent>
            <Stack spacing={2}>
              <TextField
                label="Title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                fullWidth
                variant="standard"
              />
              <TextField
                label="Description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                fullWidth
                variant="standard"
              />
            </Stack>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseModal}>Cancel</Button>
            <Button type="submit">Save</Button>
          </DialogActions>
        </Stack>
      </form>
    </Dialog>
  );
};
