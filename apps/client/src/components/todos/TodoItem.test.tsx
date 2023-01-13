import { describe, expect, it } from "vitest";
import { render, type RenderResult } from "@testing-library/react";
import { TodoItem } from "./TodoItem";
import type { Todo } from "../../api";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { nanoid } from "nanoid";

const TODO: Todo = {
  id: 1,
  description: "Test",
  done: false,
  user: {
    username: "tester",
    email: "test@test.com",
    id: "tester-id",
    todos: [],
  },
};

function renderTodo(todo: Todo, id: string): RenderResult {
  const queryClient = new QueryClient({
    logger: { error: () => {}, warn: () => {}, log: () => {} },
  });
  return render(
    <QueryClientProvider client={queryClient}>
      <TodoItem localId={id} todo={todo} />
    </QueryClientProvider>
  );
}

describe("TodoItem", () => {
  it("renders the description", async () => {
    const todo = TODO;
    const id = nanoid();
    const todoItem = renderTodo(todo, id);
    const todoDescription = await todoItem.findByRole("todo-description");
    expect(todoDescription.innerText).toEqual(todo.description);
    todoItem.unmount();
  });

  it("renders an unchecked todo", async () => {
    const uncheckedTodo = TODO;
    const id = nanoid();
    const todoItem = renderTodo(uncheckedTodo, id);
    const todoCheckbox = await todoItem.findByTestId(id + "-input");
    console.log("TODO CHECKBOX", todoCheckbox);
    expect((todoCheckbox.firstChild as HTMLInputElement).checked).toBe(false);
    todoItem.unmount();
  });

  it("renders an checked todo", async () => {
    const checkedTodo = { ...TODO, done: true };
    const id = nanoid();
    const todoItem = renderTodo(checkedTodo, id);
    const todoCheckbox = await todoItem.findByTestId(id + "-input");
    expect((todoCheckbox.firstChild as HTMLInputElement).checked).toBe(true);
    todoItem.unmount();
  });
});
