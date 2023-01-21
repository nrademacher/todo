import type { Todo } from "../api";
import {
  type EditorTodoProperties,
  type MutableTodoProperties,
  useTodoEditorStore,
} from "../stores";

interface UseTodoEditorResult {
  isEditorOpen: boolean;
  openEditor: () => void;
  closeEditor: () => void;
  setEditorTodo: (todo: Todo) => void;
  currentTodo: EditorTodoProperties;
  editCurrentTodo: (property: MutableTodoProperties) => void;
}

export function useTodoEditor(): UseTodoEditorResult {
  const {
    isEditorOpen,
    setIsEditorOpen,
    setCurrentEditorTodo: setEditorTodo,
    todo: currentTodo,
    editCurrentTodo,
  } = useTodoEditorStore();

  function openEditor(): void {
    setIsEditorOpen(true);
  }

  function closeEditor(): void {
    setIsEditorOpen(false);
  }

  return {
    isEditorOpen,
    openEditor,
    closeEditor,
    setEditorTodo,
    currentTodo,
    editCurrentTodo,
  };
}
