import supertest, { type Response } from "supertest";
import type {
  CreateTodoParams,
  CreateUserParams,
  UpdateTodoParams,
} from "../services";
import { app } from "../app";
import { dataSource, Todo } from "../database";
import { DeepPartial } from "typeorm";

describe("todoRouter", () => {
  beforeEach(async () => {
    return await dataSource.initialize();
  });

  afterEach(async () => {
    if (dataSource.isInitialized) {
      await dataSource.dropDatabase();
      await dataSource.destroy();
    }
  });

  async function userSignUpRequest(
    email = "test@testing.com"
  ): Promise<{ res: Response; requestBody: CreateUserParams }> {
    const requestBody: CreateUserParams = {
      username: "Test",
      email,
      password: "testing123XYZ!",
    };
    const res = await supertest(app)
      .post("/user")
      .set("Accept", "application/json")
      .send(requestBody);
    return {
      res,
      requestBody,
    };
  }
  async function createTodo(userToken: string): Promise<{
    res: Response;
    requestBody: CreateTodoParams;
  }> {
    const requestBody: CreateTodoParams = {
      title: "Test title",
      description: "Test description",
      done: false,
    };
    const res = await supertest(app)
      .post("/todos")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${userToken}`)
      .send(requestBody);
    return { res, requestBody };
  }

  it("should respond with 401 to unauthorized POST requests to /todos", async () => {
    const requestBody: DeepPartial<Todo> = {
      description: "Test todo",
      done: false,
    };
    const res = await supertest(app)
      .post("/todos")
      .set("Accept", "application/json")
      .send(requestBody);
    expect(res.statusCode).toBe(401);
  });

  it("should respond with appropriate status and error(s) on invalid body param(s) in POST requests to /todos", async () => {
    const { res: signUpRes } = await userSignUpRequest();
    const requestBody = {
      title: "",
      description: 42,
      done: false,
    };
    const res = await supertest(app)
      .post("/todos")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${signUpRes.body.token as string}`)
      .send(requestBody);
    expect(res.statusCode).toBe(400);
    expect(JSON.parse((res.error as { text: string }).text)).toStrictEqual({
      errors: [
        {
          location: "body",
          msg: "Invalid value",
          param: "title",
          value: "",
        },
        {
          location: "body",
          msg: "Invalid value",
          param: "description",
          value: 42,
        },
      ],
    });
  });

  it("should create a new todo for authorized user on valid POST requests to /todos", async () => {
    const { res: signUpRes } = await userSignUpRequest();
    const { res, requestBody } = await createTodo(signUpRes.body.token);
    expect(res.statusCode).toBe(200);
    expect(res.body.description).toEqual(requestBody.description);
    expect(res.body.done).toEqual(requestBody.done);
    expect(res.body.user.email).toEqual(signUpRes.body.user.email);
  });

  it("should respond with 401 to unauthorized GET requests to /todos", async () => {
    const res = await supertest(app).get("/todos");
    expect(res.statusCode).toBe(401);
  });

  it("should respond with authorized user's todos on valid GET requests to /todos", async () => {
    const { res: signUpRes } = await userSignUpRequest();
    await createTodo(signUpRes.body.token);
    await createTodo(signUpRes.body.token);
    const res = await supertest(app)
      .get("/todos")
      .set("Authorization", `Bearer ${signUpRes.body.token as string}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveLength(2);
    expect(res.body[0].user.id).toEqual(signUpRes.body.user.id);
    expect(res.body[1].user.id).toEqual(signUpRes.body.user.id);
  });

  it("should respond with 401 to unauthorized GET requests to /todos/:id", async () => {
    const { res: signUpRes } = await userSignUpRequest();
    await createTodo(signUpRes.body.token);
    const res = await supertest(app).get("/todos/1");
    expect(res.statusCode).toBe(401);
  });

  it("should respond with 403 to GET requests to /todos/:id with authorization mismatch", async () => {
    const { res: signUpResOne } = await userSignUpRequest("test1@test.com");
    await createTodo(signUpResOne.body.token);
    const { res: signUpResTwo } = await userSignUpRequest("test2@test.com");
    const res = await supertest(app)
      .get("/todos/1")
      .set("Authorization", `Bearer ${signUpResTwo.body.token as string}`);
    expect(res.statusCode).toBe(403);
  });

  it("should respond with 404 to GET requests to /todos/:id where no todo was found for id", async () => {
    const { res: signUpRes } = await userSignUpRequest();
    const res = await supertest(app)
      .get("/todos/1")
      .set("Authorization", `Bearer ${signUpRes.body.token as string}`);
    expect(res.statusCode).toBe(404);
  });

  it("should respond with todo to valid GET requests to /todos/:id", async () => {
    const { res: signUpRes } = await userSignUpRequest();
    const { res: createTodoRes } = await createTodo(signUpRes.body.token);
    const res = await supertest(app)
      .get("/todos/1")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${signUpRes.body.token as string}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toStrictEqual(createTodoRes.body);
  });

  it("should respond with 401 to unauthorized PATCH requests to /todos/:id", async () => {
    const requestBody: UpdateTodoParams = {
      title: "update title test",
      description: "update description test",
      done: true,
    };
    const { res: signUpRes } = await userSignUpRequest();
    await createTodo(signUpRes.body.token);
    const res = await supertest(app)
      .patch("/todos/1")
      .set("Accept", "application/json")
      .send(requestBody);
    expect(res.statusCode).toBe(401);
  });

  it("should respond with 403 to PATCH requests to /todos/:id with authorization mismatch", async () => {
    const requestBody: UpdateTodoParams = {
      title: "update title test",
      description: "update description test",
      done: true,
    };
    const { res: signUpResOne } = await userSignUpRequest("test1@test.com");
    await createTodo(signUpResOne.body.token);
    const { res: signUpResTwo } = await userSignUpRequest("test2@test.com");
    const res = await supertest(app)
      .patch("/todos/1")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${signUpResTwo.body.token as string}`)
      .send(requestBody);
    expect(res.statusCode).toBe(403);
  });

  it("should respond with 404 to PATCH requests to /todos/:id where no todo was found for id", async () => {
    const requestBody: UpdateTodoParams = {
      title: "update title test",
      description: "update description test",
      done: true,
    };
    const { res: signUpRes } = await userSignUpRequest();
    const res = await supertest(app)
      .patch("/todos/1")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${signUpRes.body.token as string}`)
      .send(requestBody);
    expect(res.statusCode).toBe(404);
  });

  it("should respond with updated todo to valid PATCH requests to /todos/:id", async () => {
    const requestBody: UpdateTodoParams = {
      title: "update title test",
      description: "update description test",
      done: true,
    };
    const { res: signUpRes } = await userSignUpRequest();
    await createTodo(signUpRes.body.token);
    const res = await supertest(app)
      .patch("/todos/1")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${signUpRes.body.token as string}`)
      .send(requestBody);
    expect(res.statusCode).toBe(200);
    expect(res.body.done).toEqual(requestBody.done);
  });

  it("should respond with appropriate status and error(s) on invalid body param(s) in PATCH requests to /todos", async () => {
    const { res: signUpRes } = await userSignUpRequest();
    await createTodo(signUpRes.body.token);
    const requestBody = {
      title: "",
      description: 42,
      done: false,
    };
    const res = await supertest(app)
      .patch("/todos/1")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${signUpRes.body.token as string}`)
      .send(requestBody);
    expect(res.statusCode).toBe(400);
    expect(JSON.parse((res.error as { text: string }).text)).toStrictEqual({
      errors: [
        {
          location: "body",
          msg: "Invalid value",
          param: "title",
          value: "",
        },
        {
          location: "body",
          msg: "Invalid value",
          param: "description",
          value: 42,
        },
      ],
    });
  });

  it("should respond with 401 to unauthorized DELETE requests to /todos/:id", async () => {
    const { res: signUpRes } = await userSignUpRequest();
    await createTodo(signUpRes.body.token);
    const res = await supertest(app).delete("/todos/1");
    expect(res.statusCode).toBe(401);
  });

  it("should respond with 403 to DELETE requests to /todos/:id with authorization mismatch", async () => {
    const { res: signUpResOne } = await userSignUpRequest("test1@test.com");
    await createTodo(signUpResOne.body.token);
    const { res: signUpResTwo } = await userSignUpRequest("test2@test.com");
    const res = await supertest(app)
      .delete("/todos/1")
      .set("Authorization", `Bearer ${signUpResTwo.body.token as string}`);
    expect(res.statusCode).toBe(403);
  });

  it("should respond with 404 to DELETE requests to /todos/:id where no todo was found for id", async () => {
    const { res: signUpRes } = await userSignUpRequest();
    const res = await supertest(app)
      .delete("/todos/1")
      .set("Authorization", `Bearer ${signUpRes.body.token as string}`);
    expect(res.statusCode).toBe(404);
  });

  it("should respond with delete result to valid DELETE requests to /todos/:id", async () => {
    const { res: signUpRes } = await userSignUpRequest();
    await createTodo(signUpRes.body.token);
    const res = await supertest(app)
      .delete("/todos/1")
      .set("Authorization", `Bearer ${signUpRes.body.token as string}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toStrictEqual({});
  });
});
