import { dataSource, Todo, User } from "../database";
import type { UserId } from "./user-service";
import type { DeleteResult } from "typeorm";

export type TodoId = Todo["id"];
export type CreateTodoParams = Omit<Todo, "id" | "user">;
export type UpdateTodoParams = Partial<CreateTodoParams>;

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

  public static async getTodoById(id: TodoId): Promise<Todo | null> {
    return await dataSource.getRepository(Todo).findOne({
      relations: {
        user: true,
      },
      where: { id },
    });
  }

  public static async createTodo(
    userId: UserId,
    params: CreateTodoParams
  ): Promise<Todo> {
    const user = await dataSource.getRepository(User).findOneBy({ id: userId });
    const todo = dataSource.getRepository(Todo).create({ ...params, user });
    return await dataSource.getRepository(Todo).save(todo);
  }

  public static async updateTodo(
    id: TodoId,
    params: UpdateTodoParams
  ): Promise<Todo | null> {
    const todo = await dataSource.getRepository(Todo).findOne({
      relations: {
        user: true,
      },
      where: {
        id,
      },
    });
    if (!todo) return null;
    dataSource.getRepository(Todo).merge(todo, params);
    return await dataSource.getRepository(Todo).save(todo);
  }

  public static async deleteTodo(id: TodoId): Promise<DeleteResult> {
    return await dataSource.getRepository(Todo).delete(id);
  }
}
