import { dataSource, User } from "../database";
import { UserService } from "./user-service";
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
    const result = await UserService.createUser({
      username: "Test",
      password: "testing123XYZ!",
      email: "test@testing.com",
    });
    expect(result).toBeTruthy();
    expect(typeof result === "string").toBe(true);
  });

  it("does not create users with duplicate email", async () => {
    let result: string | undefined;
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

  it("gets created users", async () => {
    await UserService.createUser({
      username: "Test",
      password: "testing123XYZ!",
      email: "test@testing.com",
    });
    await UserService.createUser({
      username: "Test2",
      password: "testing123XYZ!",
      email: "test2@testing.com",
    });
    const result = await UserService.getUsers();
    expect(result.find((user) => user.email === "test@testing.com"))
      .toBeTruthy();
    expect(result.find((user) => user.email === "test2@testing.com"))
      .toBeTruthy();
  });

  it("gets a single user by id", async () => {
    await UserService.createUser({
      username: "Test",
      password: "testing123XYZ!",
      email: "test@testing.com",
    });
    const [{ id }] = await UserService.getUsers();
    const result = await UserService.getUserById(id);
    expect(result.id).toBe(id);
  });

  it("updates a user", async () => {
    await UserService.createUser({
      username: "Test",
      password: "testing123XYZ!",
      email: "test@testing.com",
    });
    const [createdUser] = await UserService.getUsers();
    await UserService.updateUser(createdUser.id, {
      username: "UpdateUserTest",
    });
    const updatedUser = await UserService.getUserById(createdUser.id);
    expect(updatedUser.username).toBe("UpdateUserTest");
  });

  it("deletes a user", async () => {
    await UserService.createUser({
      username: "Test",
      password: "testing123XYZ!",
      email: "test@testing.com",
    });
    const [{ id }] = await UserService.getUsers();
    await UserService.deleteUser(id);
    const result = await UserService.getUserById(id);
    expect(result).toBe(null);
  });
});
