import { dataSource, User } from "../database";
import { type JwtPayload, sign, verify } from "jsonwebtoken";
import { compare, hash } from "bcryptjs";
import type { CreateUserParams } from "./user-service";
import { config } from "../configs";

export type SignInUserParams = Pick<CreateUserParams, "email" | "password">;

export type UserAuthPayload = JwtPayload & Pick<User, "id" | "email">;

export class AuthorizationError extends Error {
  public readonly name = "AuthorizationError";
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

export function createUserToken(user: User): string {
  const token = sign({ id: user.id, email: user.email }, config.secrets.jwt);
  return token;
}

export function authorizeUser(token: string): UserAuthPayload {
  const user = verify(token, config.secrets.jwt) as UserAuthPayload;
  return user;
}

export async function hashPassword(password: string): Promise<string> {
  return await hash(password, 5);
}

async function isPasswordMatch(
  password: string,
  hash: string
): Promise<boolean> {
  return await compare(password, hash);
}

export async function signInUser(params: SignInUserParams): Promise<string> {
  const user = await dataSource.getRepository(User).findOneBy({
    email: params.email,
  });
  if (user == null) {
    throw new AuthorizationError("Invalid credentials", 403);
  }

  const passwordMatch = await isPasswordMatch(
    params.password,
    user.passwordHash
  );
  if (!passwordMatch) {
    throw new AuthorizationError("Invalid credentials", 403);
  }

  const token = createUserToken(user);
  return token;
}
