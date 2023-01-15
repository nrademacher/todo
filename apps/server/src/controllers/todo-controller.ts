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
  res.json(todos);
}

export async function getTodoById(
  reqId: UserId,
  id: TodoId,
  res: Response
): Promise<void> {
  const todo = await todoService.getTodoById(id);
  if (todo == null) {
    res.sendStatus(404).end();
    return;
  }
  if (reqId !== todo.user.id) {
    res.sendStatus(403).end();
    return;
  }
  res.json(todo);
}

export async function createTodo(
  params: CreateTodoParams,
  userId: UserId,
  res: Response
): Promise<void> {
  const todo = await todoService.createTodo(userId, params);
  res.json(todo);
}

export async function updateTodo(
  reqId: UserId,
  id: TodoId,
  params: UpdateTodoParams,
  res: Response
): Promise<void> {
  const todo = await todoService.getTodoById(id);
  if (todo == null) {
    res.sendStatus(404).end();
    return;
  }
  if (reqId !== todo.user.id) {
    res.sendStatus(403).end();
    return;
  }
  const updatedTodo = await todoService.updateTodo(todo.id, params);
  res.json(updatedTodo);
}

export async function deleteTodo(
  reqId: UserId,
  id: TodoId,
  res: Response
): Promise<void> {
  const todo = await todoService.getTodoById(id);
  if (todo == null) {
    res.sendStatus(404).end();
    return;
  }
  if (reqId !== todo.user.id) {
    res.sendStatus(403).end();
    return;
  }
  const result = todoService.deleteTodo(todo.id);
  res.json(result);
}
