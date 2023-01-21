import { useState } from "react";
import { useTodos } from "../../hooks";
import { Button, CircularProgress, Stack, TextField } from "@mui/material";

export const TodoForm: React.FC = () => {
  const [todoTitle, setTodoTitle] = useState("");
  const [todoDescription, setTodoDescription] = useState("");
  const { isQueryLoading, isAddMutationLoading, add } = useTodos();

  function resetForm(): void {
    setTodoTitle("");
    setTodoDescription("");
  }

  async function handleCreate(): Promise<void> {
    const newTodoParams = {
      title: todoTitle,
      description: todoDescription !== "" ? todoDescription : undefined,
    };
    resetForm();
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
      <Stack spacing={1} sx={{ width: "100%" }}>
        <TextField
          label="Title"
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
        />
        <TextField
          label="Description (optional)"
          value={todoDescription}
          onChange={(e) => setTodoDescription(e.target.value)}
        />
        <Button
          variant="contained"
          type="submit"
          disabled={todoTitle === "" || isAddMutationLoading}
        >
          Create Todo
        </Button>
      </Stack>
    </form>
  );
};
