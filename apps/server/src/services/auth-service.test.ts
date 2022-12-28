import { dataSource, User } from "../database";
import { type AuthorizationError, AuthService } from "./auth-service";
import { compare } from "bcryptjs";

describe("AuthService", () => {
  beforeEach(async () => {
    await dataSource.initialize();
  });

  afterEach(async () => {
    await dataSource.dropDatabase();
    await dataSource.destroy();
  });

  it("creates an auth token for a given user", async () => {
    const user = await dataSource.getRepository(User).save({
      username: "Test",
      passwordHash: "testing123XYZ!",
      email: "test@testing.com",
    });
    const token = AuthService.createUserToken(user);
    expect(token).toBeTruthy();
    expect(typeof token === "string").toBe(true);
  });

  it("retrieves encoded user properties from a given auth token", async () => {
    const user = await dataSource.getRepository(User).save({
      username: "Test",
      passwordHash: "testing123XYZ!",
      email: "test@testing.com",
    });
    const token = AuthService.createUserToken(user);
    const decodedProperties = AuthService.authorizeUser(token);
    expect(user.id).toEqual(decodedProperties.id);
  });

  it("creates a hash that encodes a given password", async () => {
    const password = "testing123XYZ";
    const passwordHash = await AuthService.hashPassword(password);
    expect(await compare(password, passwordHash)).toBe(true);
  });

  it("creates an auth token given parameters for user sign-ins", async () => {
    const password = "testing123XYZ";
    const passwordHash = await AuthService.hashPassword(password);
    await dataSource.getRepository(User).save({
      username: "Test",
      passwordHash,
      email: "test@testing.com",
    });
    const signInParams = {
      email: "test@testing.com",
      password,
    };
    const signInToken = await AuthService.signInUser(signInParams);
    expect(signInToken).toBeTruthy();
    expect(typeof signInToken === "string").toBe(true);
  });

  it("throws an appropriate error if no corresponding user for sign-in params", async () => {
    const password = "testing123XYZ";
    const signInParams = {
      email: "test@testing.com",
      password,
    };
    let result: string | undefined;
    let expectedError: AuthorizationError;
    try {
      result = await AuthService.signInUser(signInParams);
    } catch (error) {
      expectedError = error;
    }
    expect(result).toBeUndefined();
    expect(expectedError.message).toEqual("Invalid credentials");
  });

  it("throws an appropriate error if user exists but wrong sign-in credential", async () => {
    const password = "testing123XYZ";
    const passwordHash = await AuthService.hashPassword(password);
    await dataSource.getRepository(User).save({
      username: "Test",
      passwordHash,
      email: "test@testing.com",
    });
    const signInParams = {
      email: "test@testing.com",
      password: "wrong_password",
    };
    let result: string | undefined;
    let expectedError: AuthorizationError;
    try {
      result = await AuthService.signInUser(signInParams);
    } catch (error) {
      expectedError = error;
    }
    expect(result).toBeUndefined();
    expect(expectedError.message).toEqual("Invalid credentials");
  });
});
