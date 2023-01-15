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
  const sanitizedTodos = todos.map((todo) => {
    const { user } = todo;
    const { passwordHash, ...sanitizedUser } = user;
    return { ...todo, user: sanitizedUser };
  });
  res.json(sanitizedTodos);
}

export async function getTodoById(
  reqId: UserId,
  id: TodoId,
  res: Response,
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
  const { user } = todo;
  const { passwordHash, ...sanitizedUser } = user;
  res.json({ ...todo, user: sanitizedUser });
}

export async function createTodo(
  params: CreateTodoParams,
  userId: UserId,
  res: Response,
): Promise<void> {
  const todo = await todoService.createTodo(userId, params);
  const { user } = todo;
  const { passwordHash, ...sanitizedUser } = user;
  res.json({ ...todo, user: sanitizedUser });
}

export async function updateTodo(
  reqId: UserId,
  id: TodoId,
  params: UpdateTodoParams,
  res: Response,
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
  if (updatedTodo) {
    const { user } = updatedTodo;
    const { passwordHash, ...sanitizedUser } = user;
    res.json({ ...updatedTodo, user: sanitizedUser });
  }
}

export async function deleteTodo(
  reqId: UserId,
  id: TodoId,
  res: Response,
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
