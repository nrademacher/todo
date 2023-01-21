import type { Todo } from "../api";
import { create } from "zustand";
import merge from "lodash.merge";

export type EditorTodoProperties = Pick<Todo, "id" | "description">;
export type MutableTodoProperties = Pick<EditorTodoProperties, "description">;

interface TodoEditorState {
  todo: EditorTodoProperties;
  isEditorOpen: boolean;
  setCurrentEditorTodo: (todo: Todo) => void;
  setIsEditorOpen: (isModalOpen: boolean) => void;
  editCurrentTodo: (property: MutableTodoProperties) => void;
}

export const useTodoEditorStore = create<TodoEditorState>((set) => ({
  todo: {
    id: 0,
    description: "",
  },
  isEditorOpen: false,
  setIsEditorOpen: (isModalOpen: boolean) =>
    set(() => ({ isEditorOpen: isModalOpen })),
  setCurrentEditorTodo: (todo: Todo) =>
    set(() => ({ todo: { id: todo.id, description: todo.description } })),
  editCurrentTodo: (mutableTodoProperties: MutableTodoProperties) =>
    set((state: TodoEditorState) => ({
      todo: merge(state.todo, mutableTodoProperties),
    })),
}));
