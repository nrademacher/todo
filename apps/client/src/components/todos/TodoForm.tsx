import { useState } from "react";
import { useTodos } from "../../hooks";

import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

export const TodoForm: React.FC = () => {
  const [todoDescription, setTodoDescription] = useState("");
  const { isLoading, add } = useTodos();

  async function handleCreate(): Promise<void> {
    const newTodoParams = {
      description: todoDescription,
    };
    setTodoDescription("");
    await add(newTodoParams);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <form
      onSubmit={async (e) => {
        e.preventDefault();
        await handleCreate();
      }}
    >
      <Stack direction="row" spacing={1}>
        <TextField
          label="New Todo"
          value={todoDescription}
          onChange={(e) => setTodoDescription(e.target.value)}
        />
        <Button
          variant="contained"
          type="submit"
          disabled={todoDescription === ""}
        >
          Create Todo
        </Button>
      </Stack>
    </form>
  );
};
