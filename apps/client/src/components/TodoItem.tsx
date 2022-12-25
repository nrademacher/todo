import type { Todo, TodoId } from "../api";
import { useTodos } from "../hooks";

export const TodoItem: React.FC<{ localId: string; todo: Todo }> = (
  { localId, todo },
) => {
  const { update, remove } = useTodos();

  async function handleCheckedChange(todoId: TodoId, checked: boolean) {
    try {
      const updateTodoParams = {
        done: checked,
      };
      await update({ id: todoId, payload: updateTodoParams });
    } catch (e) {
      // @TODO: error handling
      throw e;
    }
  }

  async function handleDelete(todoId: TodoId) {
    try {
      await remove(todoId);
    } catch (e) {
      // @TODO: error handling
      throw e;
    }
  }

  return (
    <div>
      <label htmlFor={localId}>{todo.description}, id: {todo.id}</label>
      <input
        id={localId}
        type="checkbox"
        checked={todo.done}
        onChange={async (e) =>
          await handleCheckedChange(todo.id, e.target.checked)}
      />
      <button
        onClick={async () => await handleDelete(todo.id)}
      >
        Delete
      </button>
    </div>
  );
};