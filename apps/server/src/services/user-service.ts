import { dataSource, User } from "../database";
import { AuthService } from "./auth-service";
import type { DeleteResult } from "typeorm";

export type UserId = User["id"];
export type CreateUserParams = Pick<User, "username" | "email"> & {
  password: string;
};
export type UpdateUserParams = Partial<CreateUserParams & Pick<User, "todos">>;

export class UserService {
  public static async getUsers(): Promise<User[]> {
    return await dataSource.getRepository(User).find({
      relations: {
        todos: true,
      },
    });
  }

  public static async getUserById(id: UserId): Promise<User | null> {
    return await dataSource.getRepository(User).findOne({
      relations: {
        todos: true,
      },
      where: {
        id,
      },
    });
  }

  public static async createUser(params: CreateUserParams): Promise<string | undefined> {
    const { password, ...userParams } = params;
    const passwordHash = await AuthService.hashPassword(password);
    const user = dataSource.getRepository(User).create({
      ...userParams,
      passwordHash,
    });
    await dataSource.getRepository(User).save(user);
    const token = AuthService.createUserToken(user);
    return token;
  }

  public static async updateUser(
    id: UserId,
    params: UpdateUserParams,
  ): Promise<User | null> {
    const user = await dataSource.getRepository(User).findOneBy({
      id,
    });
    if (!user) return null
    dataSource.getRepository(User).merge(user, params);
    return await dataSource.getRepository(User).save(user);
  }

  public static async deleteUser(id: UserId): Promise<DeleteResult> {
    return await dataSource.getRepository(User).delete(id);
  }
}
