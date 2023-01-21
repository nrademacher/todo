import { useTodoEditor, useTodos } from "../../hooks";
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
}

export const EditTodoModal: React.FC<IEditTodoModal> = ({ isModalOpen }) => {
  const { update } = useTodos();
  const { currentTodo, editCurrentTodo, closeEditor } = useTodoEditor();

  function handleCloseModal(): void {
    closeEditor();
  }

  async function handleEditDescription(): Promise<void> {
    const updateTodoParams = {
      description: currentTodo.description,
    };
    await update({ id: currentTodo.id, payload: updateTodoParams });
    closeEditor();
  }

  return (
    <Dialog open={isModalOpen} onClose={handleCloseModal} fullWidth>
      <DialogTitle>Edit Todo details</DialogTitle>
      <DialogContent>
        <TextField
          label="Description"
          value={currentTodo.description}
          onChange={(e) => editCurrentTodo({ description: e.target.value })}
          fullWidth
          variant="standard"
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCloseModal}>Cancel</Button>
        <Button onClick={async () => await handleEditDescription()}>
          Save
        </Button>
      </DialogActions>
    </Dialog>
  );
};
