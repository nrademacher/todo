import type { Todo } from "../../api";
import { useState } from "react";
import { useTodos } from "../../hooks";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
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
  const [description, setDescription] = useState(todo.description);
  const { update } = useTodos();

  function handleCloseModal(): void {
    closeModal();
  }

  async function handleUpdate(): Promise<void> {
    const updateTodoParams = {
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
        <DialogContent>
          <TextField
            label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            fullWidth
            variant="standard"
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseModal}>Cancel</Button>
          <Button type="submit">Save</Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};
