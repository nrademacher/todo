import { dataSource, User } from "../database";
import { createUserToken, hashPassword } from "./auth-service";
import type { DeleteResult } from "typeorm";

export type UserId = User["id"];
export type CreateUserParams = Pick<User, "username" | "email"> & {
  password: string;
};
export type UpdateUserParams = Partial<CreateUserParams & Pick<User, "todos">>;
export interface CreateUserResponse {
  user: User;
  token: string;
}

export class CreateUserError extends Error {
  public readonly name = "CreateUserError";
  public readonly statusCode: number;

  constructor(message: string, statusCode: number) {
    super();
    this.message = message;
    this.statusCode = statusCode;
  }
}

export async function getUserById(id: UserId): Promise<User | null> {
  const res = await dataSource.getRepository(User).findOne({
    relations: {
      todos: true,
    },
    where: {
      id,
    },
  });
  return res;
}

export async function createUser(
  params: CreateUserParams
): Promise<CreateUserResponse> {
  const { password, ...userParams } = params;
  const existingUser = await dataSource.getRepository(User).findOneBy({
    email: userParams.email,
  });
  if (existingUser !== null) {
      throw new CreateUserError("User already exists for given email", 409)
  }
  const passwordHash = await hashPassword(password);
  const user = dataSource.getRepository(User).create({
    ...userParams,
    passwordHash,
  });
  const savedUser = await dataSource.getRepository(User).save(user);
  const token = createUserToken(user);
  return { user: savedUser, token };
}

export async function updateUser(
  id: UserId,
  params: UpdateUserParams
): Promise<User | null> {
  const user = await dataSource.getRepository(User).findOneBy({
    id,
  });
  if (user == null) return null;
  dataSource.getRepository(User).merge(user, params);
  return await dataSource.getRepository(User).save(user);
}

export async function deleteUser(id: UserId): Promise<DeleteResult> {
  return await dataSource.getRepository(User).delete(id);
}
