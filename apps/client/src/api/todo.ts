import type { User } from "./user";
import { API_URL } from "../constants";
import axios from "axios";

import { setAuthorization } from "./utils";

const TODO_ROUTE_NAME = "todos";

export interface Todo {
  id: number;
  description: string;
  done: boolean;
  user: User;
}

export async function getTodos(): Promise<Todo[] | undefined> {
  const res = await axios.get(`${API_URL}/${TODO_ROUTE_NAME}`, {
    headers: setAuthorization(),
  });
  return res.data;
}

export type CreateTodoParams = Pick<Todo, "description">;

export async function createTodo(params: CreateTodoParams): Promise<void> {
  await axios.post(`${API_URL}/${TODO_ROUTE_NAME}`, params, {
    headers: setAuthorization(),
  });
}

export type TodoId = Todo["id"];

export async function getTodoById(id: TodoId): Promise<void> {
  const res = await axios.get(`${API_URL}/${TODO_ROUTE_NAME}/${id}`, {
    headers: setAuthorization(),
  });
  return res.data;
}

export type UpdateTodoParams = Pick<Todo, "id"> & {
  payload: Partial<Pick<Todo, "description" | "done">>;
};

export async function updateTodo(params: UpdateTodoParams): Promise<void> {
  await axios.patch(
    `${API_URL}/${TODO_ROUTE_NAME}/${params.id}`,
    params.payload,
    {
      headers: setAuthorization(),
    }
  );
}

export async function deleteTodo(id: TodoId): Promise<void> {
  await axios.delete(`${API_URL}/${TODO_ROUTE_NAME}/${id}`, {
    headers: setAuthorization(),
  });
}
