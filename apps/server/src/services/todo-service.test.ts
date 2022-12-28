import { dataSource } from "../database";
import { UserService } from "./user-service";
import { TodoService } from "./todo-service";

describe("TodoService", () => {
  beforeEach(async () => {
    await dataSource.initialize();
  });

  afterEach(async () => {
    await dataSource.dropDatabase();
    await dataSource.destroy();
  });

  it("creates a todo for a given user relation", async () => {
    await UserService.createUser({
      username: "Test",
      password: "testing123XYZ!",
      email: "test@testing.com",
    });
    const [{ id: userId }] = await UserService.getUsers();
    const todo = await TodoService.createTodo(userId, {
      description: "Lorem ipsum",
      done: false,
    });
    expect(todo).toBeTruthy();
    expect(todo.id).toBeTruthy();
    expect(todo.user.id).toBe(userId);
  });

  it("gets created todos", async () => {
    await UserService.createUser({
      username: "Test",
      password: "testing123XYZ!",
      email: "test@testing.com",
    });
    const [{ id: userId }] = await UserService.getUsers();
    const { id: todoOneId } = await TodoService.createTodo(userId, {
      description: "Lorem ipsum",
      done: false,
    });
    const { id: todoTwoId } = await TodoService.createTodo(userId, {
      description: "Lorem ipsum",
      done: false,
    });
    const result = await TodoService.getTodos(userId);
    expect(result.find((todo) => todo.id === todoOneId))
      .toBeTruthy();
    expect(result.find((todo) => todo.id === todoTwoId))
      .toBeTruthy();
  });

  it("gets a todo by id", async () => {
    await UserService.createUser({
      username: "Test",
      password: "testing123XYZ!",
      email: "test@testing.com",
    });
    const [{ id: userId }] = await UserService.getUsers();
    const { id: todoId } = await TodoService.createTodo(userId, {
      description: "Lorem ipsum",
      done: false,
    });
    const result = await TodoService.getTodoById(todoId)
    expect(result.id).toBe(todoId)
    expect(result.user.id).toBe(userId);
  });

  it("updates a todo", async () => {
    await UserService.createUser({
      username: "Test",
      password: "testing123XYZ!",
      email: "test@testing.com",
    });
    const [{ id: userId }] = await UserService.getUsers();
    const { id: todoId } = await TodoService.createTodo(userId, {
      description: "Lorem ipsum",
      done: false,
    });
    await TodoService.updateTodo(todoId, { done: true })
    const result = await TodoService.getTodoById(todoId)
    expect(result.done).toBe(true);
  });

  it("deletes a todo", async () => {
    await UserService.createUser({
      username: "Test",
      password: "testing123XYZ!",
      email: "test@testing.com",
    });
    const [{ id: userId }] = await UserService.getUsers();
    const { id: todoId } = await TodoService.createTodo(userId, {
      description: "Lorem ipsum",
      done: false,
    });
    await TodoService.deleteTodo(todoId);
    const result = await TodoService.getTodoById(todoId);
    expect(result).toBe(null);
  });
});
