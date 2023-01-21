import { dataSource } from "../database";
import * as userService from "./user-service";
import {
  createTodo,
  type CreateTodoParams,
  deleteTodo,
  getTodoById,
  getTodos,
  updateTodo,
} from "./todo-service";

describe("todo service", () => {
  beforeEach(async () => {
    return await dataSource.initialize();
  });

  afterEach(async () => {
    await dataSource.dropDatabase();
    await dataSource.destroy();
  });

  it("creates a todo for a given user relation", async () => {
    const { user } = await userService.createUser({
      username: "Test",
      password: "testing123XYZ!",
      email: "test@testing.com",
    });
    const todo = await createTodo(user.id, {
      title: "Test todo",
      description: "Lorem ipsum",
      done: false,
    });
    expect(todo).toBeTruthy();
    expect(todo.id).toBeTruthy();
    expect(todo.user.id).toBe(user.id);
  });

  it("gets created todos", async () => {
    const { user } = await userService.createUser({
      username: "Test",
      password: "testing123XYZ!",
      email: "test@testing.com",
    });
    const todoParams: CreateTodoParams = {
      title: "Test todo",
      description: "Lorem ipsum",
      done: false,
    };
    const { id: todoOneId } = await createTodo(user.id, todoParams);
    const { id: todoTwoId } = await createTodo(user.id, todoParams);
    const result = await getTodos(user.id);
    expect(result.find((todo) => todo.id === todoOneId)).toBeTruthy();
    expect(result.find((todo) => todo.id === todoTwoId)).toBeTruthy();
  });

  it("gets a todo by id", async () => {
    const { user } = await userService.createUser({
      username: "Test",
      password: "testing123XYZ!",
      email: "test@testing.com",
    });
    const { id: todoId } = await createTodo(user.id, {
      title: "Test todo",
      description: "Lorem ipsum",
      done: false,
    });
    const result = await getTodoById(todoId);
    expect(result?.id).toBe(todoId);
    expect(result?.user.id).toBe(user.id);
  });

  it("updates a todo", async () => {
    const { user } = await userService.createUser({
      username: "Test",
      password: "testing123XYZ!",
      email: "test@testing.com",
    });
    const { id: todoId } = await createTodo(user.id, {
      title: "Test todo",
      description: "Lorem ipsum",
      done: false,
    });
    await updateTodo(todoId, { done: true });
    const result = await getTodoById(todoId);
    expect(result?.done).toBe(true);
  });

  it("deletes a todo", async () => {
    const { user } = await userService.createUser({
      username: "Test",
      password: "testing123XYZ!",
      email: "test@testing.com",
    });
    const { id: todoId } = await createTodo(user.id, {
      title: "Test todo",
      description: "Lorem ipsum",
      done: false,
    });
    await deleteTodo(todoId);
    const result = await getTodoById(todoId);
    expect(result).toBe(null);
  });
});
