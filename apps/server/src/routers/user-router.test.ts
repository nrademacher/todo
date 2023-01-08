import { dataSource } from "../database";
import supertest, { type Response } from "supertest";
import { app } from "../app";
import type { CreateUserParams, UpdateUserParams } from "../services";

describe("userRouter", () => {
  beforeEach(async () => {
    return await dataSource.initialize();
  });

  afterEach(async () => {
    if (dataSource.isInitialized) {
      await dataSource.dropDatabase();
      return await dataSource.destroy();
    }
  });

  async function userSignUpRequest(
    email = "test@testing.com",
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

  it("should respond with created user and auth token on valid POST requests to the /users route", async () => {
    const { res, requestBody } = await userSignUpRequest();
    expect(res.statusCode).toBe(200);
    expect(res.body.user.email).toEqual(requestBody.email);
    expect(res.body.token).toBeTruthy();
    expect(typeof res.body.token === "string").toBe(true);
  });

  it("should respond with appropriate status and error(s) on invalid body param(s) in POST requests to /user", async () => {
    const weakPassword = "abcde";
    const invalidEmail = "test.testing.com";
    const signUpParams: CreateUserParams = {
      username: "Test",
      password: weakPassword,
      email: invalidEmail,
    };
    const res = await supertest(app)
      .post("/user")
      .set("Accept", "application/json")
      .send(signUpParams);
    expect(res.statusCode).toBe(400);
    expect(JSON.parse((res.error as { text: string }).text)).toStrictEqual({
      errors: [
        {
          value: "abcde",
          msg: "Invalid value",
          param: "password",
          location: "body",
        },
        {
          location: "body",
          msg: "Invalid value",
          param: "email",
          value: "test.testing.com",
        },
      ],
    });
  });

  it("should respond with 401 to unauthorized GET requests to /user", async () => {
    const res = await supertest(app).get("/user");
    expect(res.statusCode).toBe(401);
  });

  it("should respond with current user on valid GET requests to /user", async () => {
    const { res: signUpRes, requestBody } = await userSignUpRequest();
    const res = await supertest(app)
      .get("/user")
      .set("Authorization", `Bearer ${signUpRes.body.token as string}`);
    expect(res.statusCode).toBe(200);
    expect(res.body.email).toEqual(requestBody.email);
  });

  it("should respond with 401 to unauthorized PATCH requests to /user", async () => {
    const requestBody: UpdateUserParams = { email: "update@test.com" };
    const res = await supertest(app)
      .patch("/user")
      .set("Accept", "application/json")
      .send(requestBody);
    expect(res.statusCode).toBe(401);
  });

  it("should respond with appropriate error and status and error(s) on invalid body param(s) in PATCH requests to /user", async () => {
    const weakPassword = "abcde";
    const invalidEmail = "test.testing.com";
    const { res: signUpRes } = await userSignUpRequest();
    const requestBody: UpdateUserParams = {
      email: invalidEmail,
      password: weakPassword,
    };
    const res = await supertest(app)
      .patch("/user")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${signUpRes.body.token as string}`)
      .send(requestBody);
    expect(res.statusCode).toBe(400);
    expect(JSON.parse((res.error as { text: string }).text)).toStrictEqual({
      errors: [
        {
          value: "abcde",
          msg: "Invalid value",
          param: "password",
          location: "body",
        },
        {
          location: "body",
          msg: "Invalid value",
          param: "email",
          value: "test.testing.com",
        },
      ],
    });
  });

  it("should respond with updated user on valid PATCH requests to /user", async () => {
    const { res: signUpRes } = await userSignUpRequest();
    const requestBody: UpdateUserParams = { email: "update@test.com" };
    const res = await supertest(app)
      .patch("/user")
      .set("Accept", "application/json")
      .set("Authorization", `Bearer ${signUpRes.body.token as string}`)
      .send(requestBody);
    expect(res.statusCode).toBe(200);
    expect(res.body.email).toEqual(requestBody.email);
  });

  it("should respond with 401 to unauthorized DELETE requests to /user", async () => {
    const res = await supertest(app).delete("/user");
    expect(res.statusCode).toBe(401);
  });

  it("should respond with delete result on valid DELETE requests to /user", async () => {
    const { res: signUpRes } = await userSignUpRequest();
    const res = await supertest(app)
      .delete("/user")
      .set("Authorization", `Bearer ${signUpRes.body.token as string}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toStrictEqual({});
  });
});
