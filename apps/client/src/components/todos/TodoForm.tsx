import { useState } from "react";
import { useTodos } from "../../hooks";
import { Button, CircularProgress, Stack, TextField } from "@mui/material";

export const TodoForm: React.FC = () => {
  const [todoDescription, setTodoDescription] = useState("");
  const { isQueryLoading, isAddMutationLoading, add } = useTodos();

  async function handleCreate(): Promise<void> {
    const newTodoParams = {
      description: todoDescription,
    };
    setTodoDescription("");
    await add(newTodoParams);
  }

  if (isQueryLoading) {
    return <CircularProgress />;
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await handleCreate();
      }}
    >
      <Stack direction="row" spacing={1} sx={{ width: "100%" }}>
        <TextField
          label="New Todo"
          value={todoDescription}
          onChange={(e) => setTodoDescription(e.target.value)}
          sx={{ width: "75%" }}
        />
        <Button
          variant="contained"
          type="submit"
          disabled={todoDescription === "" || isAddMutationLoading}
          sx={{ width: "25%" }}
        >
          Create Todo
        </Button>
      </Stack>
    </form>
  );
};
