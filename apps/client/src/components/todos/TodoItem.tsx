import type { Todo, TodoId } from "../../api";
import { useTodos } from "../../hooks";

export const TodoItem: React.FC<{ localId: string; todo: Todo }> = ({
  localId,
  todo,
}) => {
  const { update, remove } = useTodos();

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
    <div>
      <label htmlFor={localId} data-testid={localId + "-label"}>
        {todo.description}
      </label>
      <input
        id={localId}
        data-testid={localId + "-input"}
        type="checkbox"
        checked={todo.done}
        onChange={async (e) =>
          await handleCheckedChange(todo.id, e.target.checked)
        }
      />
      <button
        onClick={async () => await handleDelete(todo.id)}
        data-testid={localId + "-button"}
      >
        Delete
      </button>
    </div>
  );
};
