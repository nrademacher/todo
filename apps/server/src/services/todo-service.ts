import { dataSource, Todo, User } from "../database";
import type { DeleteResult } from "typeorm";
import { UserId } from "./user-service";

export type TodoId = Todo["id"];
export type TodoParams = Omit<Todo, "id">;

export class TodoService {
  public static async getTodos(userId: UserId): Promise<Todo[]> {
    return await dataSource.getRepository(Todo).find({
      relations: {
        user: true,
      },
      where: {
        user: {
          id: userId,
        },
      },
    });
  }

  public static async getTodoById(id: TodoId): Promise<Todo> {
    return await dataSource.getRepository(Todo).findOne({
      relations: {
        user: true,
      },
      where: { id },
    });
  }

  public static async createTodo(
    userId: UserId,
    params: TodoParams,
  ): Promise<Todo> {
    const user = await dataSource.getRepository(User).findOneBy({ id: userId });
    const todo = dataSource.getRepository(Todo).create({ ...params, user });
    return await dataSource.getRepository(Todo).save(todo);
  }

  public static async updateTodo(
    id: TodoId,
    params: TodoParams,
  ): Promise<Todo> {
    const todo = await dataSource.getRepository(Todo).findOne({
      relations: {
        user: true,
      },
      where: {
        id,
      },
    });
    dataSource.getRepository(Todo).merge(todo, params);
    return await dataSource.getRepository(Todo).save(todo);
  }

  public static async deleteTodo(id: TodoId): Promise<DeleteResult> {
    return await dataSource.getRepository(Todo).delete(id);
  }
}
