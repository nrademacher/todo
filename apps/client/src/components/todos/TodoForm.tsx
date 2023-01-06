import { useState } from "react";
import { useTodos } from "../../hooks";

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
      <input
        value={todoDescription}
        onChange={(e) => setTodoDescription(e.target.value)}
      />
      <button type="submit" disabled={todoDescription === ""}>
        Create Todo
      </button>
    </form>
  );
};
