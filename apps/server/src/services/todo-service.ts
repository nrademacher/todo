import { dataSource, Todo } from "../database";
import type { DeleteResult } from "typeorm";

export type TodoId = Todo["id"];
export type TodoParams = Omit<Todo, "id">;

export class TodoService {
  public static async getTodos(): Promise<Todo[]> {
    return await dataSource.getRepository(Todo).find();
  }

  public static async getTodoById(id: TodoId): Promise<Todo> {
    return await dataSource.getRepository(Todo).findOneBy({
      id,
    });
  }

  public static async createTodo(
    input: TodoParams,
  ): Promise<Todo> {
    const todo = dataSource.getRepository(Todo).create(input);
    return await dataSource.getRepository(Todo).save(todo);
  }

  public static async updateTodo(
    id: TodoId,
    input: TodoParams,
  ): Promise<Todo> {
    const todo = await dataSource.getRepository(Todo).findOneBy({
      id,
    });
    dataSource.getRepository(Todo).merge(todo, input);
    return await dataSource.getRepository(Todo).save(todo);
  }

  public static async deleteTodo(id: TodoId): Promise<DeleteResult> {
    return await dataSource.getRepository(Todo).delete(id);
  }
}
