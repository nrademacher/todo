import type { Response } from "express";
import { type TodoId, type TodoParams, TodoService, UserId } from "../services";

export class TodoController {
  public static async getTodos(userId: UserId, res: Response): Promise<void> {
    const todos = await TodoService.getTodos(userId);
    res.send(todos);
  }

  public static async getTodoById(id: TodoId, res: Response): Promise<void> {
    const todo = await TodoService.getTodoById(id);
    res.send(todo);
  }

  public static async createTodo(
    params: TodoParams,
    userId: UserId,
    res: Response,
  ): Promise<void> {
    const todo = await TodoService.createTodo(userId, params);
    res.send(todo);
  }

  public static async updateTodo(
    id: TodoId,
    params: TodoParams,
    res: Response,
  ): Promise<void> {
    const todo = await TodoService.updateTodo(id, params);
    res.send(todo);
  }

  public static async deleteTodo(id: TodoId, res: Response): Promise<void> {
    const result = TodoService.deleteTodo(id);
    res.send(result);
  }
}