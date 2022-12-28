import { dataSource, User } from "../database";
import {
  CreateUserParams,
  type CreateUserResponse,
  UserService,
} from "./user-service";
import type { QueryFailedError } from "typeorm";

describe("UserService", () => {
  beforeEach(async () => {
    await dataSource.initialize();
  });

  afterEach(async () => {
    await dataSource.dropDatabase();
    await dataSource.destroy();
  });

  it("creates a user", async () => {
    const createParams: CreateUserParams = {
      username: "Test",
      password: "testing123XYZ!",
      email: "test@testing.com",
    };
    const { user } = await UserService.createUser(createParams);
    expect(user.email).toEqual(createParams.email);
  });

  it("does not create users with duplicate email", async () => {
    let result: CreateUserResponse | undefined;
    let expectedError: QueryFailedError;
    try {
      await dataSource.getRepository(User).save({
        username: "Test",
        passwordHash: "testing123XYZ!",
        email: "test@testing.com",
      });
      result = await UserService.createUser({
        username: "Test2",
        password: "testing123XYZ!",
        email: "test@testing.com",
      });
    } catch (error) {
      expectedError = error;
    }
    expect(result).toBeUndefined();
    expect(expectedError.driverError.code).toEqual("ER_DUP_ENTRY");
  });

  it("gets a single user by id", async () => {
    const { user } = await UserService.createUser({
      username: "Test",
      password: "testing123XYZ!",
      email: "test@testing.com",
    });
    const result = await UserService.getUserById(user.id);
    expect(result.id).toBe(user.id);
  });

  it("updates a user", async () => {
    const { user } = await UserService.createUser({
      username: "Test",
      password: "testing123XYZ!",
      email: "test@testing.com",
    });
    await UserService.updateUser(user.id, {
      username: "UpdateUserTest",
    });
    const updatedUser = await UserService.getUserById(user.id);
    expect(updatedUser.username).toBe("UpdateUserTest");
  });

  it("deletes a user", async () => {
    const { user } = await UserService.createUser({
      username: "Test",
      password: "testing123XYZ!",
      email: "test@testing.com",
    });
    await UserService.deleteUser(user.id);
    const result = await UserService.getUserById(user.id);
    expect(result).toBe(null);
  });
});
