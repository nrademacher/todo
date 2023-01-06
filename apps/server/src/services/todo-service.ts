import { dataSource, Todo, User } from "../database";
import type { UserId } from "./user-service";
import type { DeleteResult } from "typeorm";

export type TodoId = Todo["id"];
export type CreateTodoParams = Omit<Todo, "id" | "user">;
export type UpdateTodoParams = Partial<CreateTodoParams>;

export async function getTodos(userId: UserId): Promise<Todo[]> {
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

export async function getTodoById(id: TodoId): Promise<Todo | null> {
  return await dataSource.getRepository(Todo).findOne({
    relations: {
      user: true,
    },
    where: { id },
  });
}

export async function createTodo(
  userId: UserId,
  params: CreateTodoParams
): Promise<Todo> {
  const user = await dataSource.getRepository(User).findOneBy({ id: userId });
  if (user == null) {
    throw new Error("User not found");
  }
  const todo = dataSource.getRepository(Todo).create({ ...params, user });
  return await dataSource.getRepository(Todo).save(todo);
}

export async function updateTodo(
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
  if (todo == null) return null;
  dataSource.getRepository(Todo).merge(todo, params);
  return await dataSource.getRepository(Todo).save(todo);
}

export async function deleteTodo(id: TodoId): Promise<DeleteResult> {
  return await dataSource.getRepository(Todo).delete(id);
}
