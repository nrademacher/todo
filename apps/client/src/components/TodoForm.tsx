import { useState } from "react";
import { useTodos } from "../hooks";

export const TodoForm: React.FC = () => {
  const [todoDescription, setTodoDescription] = useState("");
  const { error, isLoading, add } = useTodos();

  async function handleCreate() {
    try {
      const newTodoParams = {
        description: todoDescription,
      };
      setTodoDescription("");
      await add.mutateAsync(newTodoParams);
    } catch (e) {
      // error handling
      throw e;
    }
  }

  if (error) {
    return <div>Error</div>;
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
      <input
        value={todoDescription}
        onChange={(e) => setTodoDescription(e.target.value)}
      />
      <button type="submit" disabled={!todoDescription}>
        Create Todo
      </button>
    </form>
  );
};
