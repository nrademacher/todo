import { dataSource } from "../database";
import type { CreateUserParams, SignInUserParams } from "../services";
import supertest, { Response } from "supertest";
import { app } from "../app";

describe("authRouter", () => {
  beforeEach(async () => {
    return await dataSource.initialize();
  });

  afterEach(async () => {
    await dataSource.dropDatabase();
    return await dataSource.destroy();
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

  it("should respond with appropriate status and error(s) on invalid body param(s) in POST requests to /user", async () => {
    const requestBody: SignInUserParams = {
      email: "aaaaaaa",
      password: "",
    };
    const res = await supertest(app)
      .post("/auth/signin")
      .set("Accept", "application/json")
      .send(requestBody);
    expect(res.statusCode).toBe(400);
    expect(JSON.parse((res.error as { text: string }).text)).toStrictEqual({
      errors: [
        {
          value: "aaaaaaa",
          msg: "Invalid value",
          param: "email",
          location: "body",
        },
        {
          location: "body",
          msg: "Invalid value",
          param: "password",
          value: "",
        },
      ],
    });
  });

  it("should respond with 403 to POST requests to the /auth/signin with invalid email credential", async () => {
    const { requestBody: signUpReqBody } = await userSignUpRequest(
      "test@test.com",
    );
    const requestBody: SignInUserParams = {
      email: "not@found.com",
      password: signUpReqBody.password,
    };
    const res = await supertest(app)
      .post("/auth/signin")
      .set("Accept", "application/json")
      .send(requestBody);
    expect(res.status).toBe(403);
  });

  it("should respond with 403 to POST requests to the /auth/signin with invalid password credential", async () => {
    const { requestBody: signUpReqBody } = await userSignUpRequest();
    const requestBody: SignInUserParams = {
      email: signUpReqBody.email,
      password: signUpReqBody.password + "abcde",
    };
    const res = await supertest(app)
      .post("/auth/signin")
      .set("Accept", "application/json")
      .send(requestBody);
    expect(res.status).toBe(403);
  });

  it("should respond with auth token on valid POST requests to the /auth/signin", async () => {
    const { requestBody: signUpReqBody } = await userSignUpRequest();
    const requestBody: SignInUserParams = {
      email: signUpReqBody.email,
      password: signUpReqBody.password,
    };
    const res = await supertest(app)
      .post("/auth/signin")
      .set("Accept", "application/json")
      .send(requestBody);
    expect(res.status).toBe(200);
    expect(res.body.token).toBeTruthy();
    expect(typeof res.body.token === "string").toBe(true);
  });
});
