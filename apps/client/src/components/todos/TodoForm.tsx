import { useState } from "react";
import { useTodos } from "../../hooks";

import CircularProgress from "@mui/material/CircularProgress";
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
          disabled={todoDescription === ""}
          sx={{ width: "25%" }}
        >
          Create Todo
        </Button>
      </Stack>
    </form>
  );
};
