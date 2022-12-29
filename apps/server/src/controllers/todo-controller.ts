import type { Response } from "express";
import {
  type CreateTodoParams,
  type TodoId,
  TodoService,
  type UpdateTodoParams,
  type UserId,
} from "../services";

export class TodoController {
  public static async getTodos(reqId: UserId, res: Response): Promise<void> {
    const todos = await TodoService.getTodos(reqId);
    res.send(todos);
  }

  public static async getTodoById(
    reqId: UserId,
    id: TodoId,
    res: Response
  ): Promise<void> {
    const todo = await TodoService.getTodoById(id);
    if (!todo) {
      res.sendStatus(404);
      return;
    }
    if (reqId !== todo.user.id) {
      res.sendStatus(403);
      return;
    }
    res.send(todo);
  }

  public static async createTodo(
    params: CreateTodoParams,
    userId: UserId,
    res: Response
  ): Promise<void> {
    const todo = await TodoService.createTodo(userId, params);
    res.send(todo);
  }

  public static async updateTodo(
    reqId: UserId,
    id: TodoId,
    params: UpdateTodoParams,
    res: Response
  ): Promise<void> {
    const todo = await TodoService.getTodoById(id);
    if (!todo) {
      res.sendStatus(404);
      return;
    }
    if (reqId !== todo.user.id) {
      res.sendStatus(403);
      return;
    }
    const updatedTodo = await TodoService.updateTodo(todo.id, params);
    res.send(updatedTodo);
  }

  public static async deleteTodo(
    reqId: UserId,
    id: TodoId,
    res: Response
  ): Promise<void> {
    const todo = await TodoService.getTodoById(id);
    if (!todo) {
      res.sendStatus(404);
      return;
    }
    if (reqId !== todo.user.id) {
      res.sendStatus(403);
      return;
    }
    const result = TodoService.deleteTodo(todo.id);
    res.send(result);
  }
}
