import { dataSource, User } from "../database";
import type { CreateUserParams, CreateUserResponse } from "./user-service";
import * as userService from "./user-service";
import type { QueryFailedError } from "typeorm";

describe("userService", () => {
  beforeEach(async () => {
    return await dataSource.initialize();
  });

  afterEach(async () => {
    await dataSource.dropDatabase();
    return await dataSource.destroy();
  });

  it("creates a user", async () => {
    const createParams: CreateUserParams = {
      username: "Test",
      password: "testing123XYZ!",
      email: "test@testing.com",
    };
    const { user } = await userService.createUser(createParams);
    expect(user.email).toEqual(createParams.email);
  });

  it("does not create users with duplicate email", async () => {
    let result: CreateUserResponse | undefined;
    let expectedError: QueryFailedError | undefined;
    try {
      await dataSource.getRepository(User).save({
        username: "Test",
        passwordHash: "testing123XYZ!",
        email: "test@testing.com",
      });
      result = await userService.createUser({
        username: "Test2",
        password: "testing123XYZ!",
        email: "test@testing.com",
      });
    } catch (error) {
      expectedError = error;
    }
    expect(result).toBeUndefined();
    expect(expectedError?.driverError.code).toEqual("ER_DUP_ENTRY");
  });

  it("gets a single user by id", async () => {
    const { user } = await userService.createUser({
      username: "Test",
      password: "testing123XYZ!",
      email: "test@testing.com",
    });
    const result = await userService.getUserById(user.id);
    expect(result?.id).toBe(user.id);
  });

  it("updates a user", async () => {
    const { user } = await userService.createUser({
      username: "Test",
      password: "testing123XYZ!",
      email: "test@testing.com",
    });
    await userService.updateUser(user.id, {
      username: "UpdateUserTest",
    });
    const updatedUser = await userService.getUserById(user.id);
    expect(updatedUser?.username).toBe("UpdateUserTest");
  });

  it("deletes a user", async () => {
    const { user } = await userService.createUser({
      username: "Test",
      password: "testing123XYZ!",
      email: "test@testing.com",
    });
    await userService.deleteUser(user.id);
    const result = await userService.getUserById(user.id);
    expect(result).toBe(null);
  });
});
