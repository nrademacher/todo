import type { User } from "./user";
import { API_URL } from "../constants";

const TODO_ROUTE_NAME = "todos";

export type Todo = {
  id: number;
  description: string;
  done: boolean;
  user: User;
};

export async function getTodos(): Promise<Todo[] | undefined> {
  try {
    const res = await fetch(`${API_URL}/${TODO_ROUTE_NAME}`);
    return await res.json();
  } catch (e) {
    console.error(e);
  }
}

export type CreateTodoParams = Pick<Todo, "description">;

export async function createTodo(params: CreateTodoParams): Promise<void> {
  try {
    await fetch(`${API_URL}/${TODO_ROUTE_NAME}`, {
      method: "POST",
      body: JSON.stringify(params),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.error(e);
  }
}

export type TodoId = Todo["id"];

export async function getTodoById(
  id: TodoId,
): Promise<void> {
  try {
    const res = await fetch(`${API_URL}/${TODO_ROUTE_NAME}/${id}`);
    return await res.json();
  } catch (e) {
    console.error(e);
  }
}

export type UpdateTodoParams = Pick<Todo, "id"> & {
  payload: Partial<Pick<Todo, "description" | "done">>;
};

export async function updateTodo(
  params: UpdateTodoParams,
): Promise<void> {
  try {
    await fetch(`${API_URL}/${TODO_ROUTE_NAME}/${params.id}`, {
      method: "PATCH",
      body: JSON.stringify(params.payload),
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (e) {
    console.error(e);
  }
}

export async function deleteTodo(
  id: TodoId,
): Promise<void> {
  try {
    await fetch(`${API_URL}/${TODO_ROUTE_NAME}/${id}`, {
      method: "DELETE",
    });
  } catch (e) {
    console.error(e);
  }
}
