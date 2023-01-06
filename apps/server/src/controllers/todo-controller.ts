import type { Response } from "express";
import type {
  CreateTodoParams,
  TodoId,
  UpdateTodoParams,
  UserId,
} from "../services";
import * as todoService from "../services/todo-service";

export async function getTodos(reqId: UserId, res: Response): Promise<void> {
  const todos = await todoService.getTodos(reqId);
  res.send(todos);
}

export async function getTodoById(
  reqId: UserId,
  id: TodoId,
  res: Response
): Promise<void> {
  const todo = await todoService.getTodoById(id);
  if (todo == null) {
    res.sendStatus(404);
    return;
  }
  if (reqId !== todo.user.id) {
    res.sendStatus(403);
    return;
  }
  res.send(todo);
}

export async function createTodo(
  params: CreateTodoParams,
  userId: UserId,
  res: Response
): Promise<void> {
  const todo = await todoService.createTodo(userId, params);
  res.send(todo);
}

export async function updateTodo(
  reqId: UserId,
  id: TodoId,
  params: UpdateTodoParams,
  res: Response
): Promise<void> {
  const todo = await todoService.getTodoById(id);
  if (todo == null) {
    res.sendStatus(404);
    return;
  }
  if (reqId !== todo.user.id) {
    res.sendStatus(403);
    return;
  }
  const updatedTodo = await todoService.updateTodo(todo.id, params);
  res.send(updatedTodo);
}

export async function deleteTodo(
  reqId: UserId,
  id: TodoId,
  res: Response
): Promise<void> {
  const todo = await todoService.getTodoById(id);
  if (todo == null) {
    res.sendStatus(404);
    return;
  }
  if (reqId !== todo.user.id) {
    res.sendStatus(403);
    return;
  }
  const result = todoService.deleteTodo(todo.id);
  res.send(result);
}
