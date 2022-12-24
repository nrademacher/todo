import { dataSource, User } from "../database";
import type { DeleteResult } from "typeorm";

export type UserId = User["id"];
export type UserParams = Omit<User, "id">;

export class UserService {
  public static async getUsers(): Promise<User[]> {
    return await dataSource.getRepository(User).find();
  }

  public static async getUserById(id: UserId): Promise<User> {
    return await dataSource.getRepository(User).findOneBy({
      id,
    });
  }

  public static async createUser(params: UserParams): Promise<User> {
    const user = dataSource.getRepository(User).create(params);
    return await dataSource.getRepository(User).save(user);
  }

  public static async updateUser(
    id: UserId,
    params: UserParams,
  ): Promise<User> {
    const user = await dataSource.getRepository(User).findOneBy({
      id,
    });
    dataSource.getRepository(User).merge(user, params);
    return await dataSource.getRepository(User).save(user);
  }

  public static async deleteUser(id: UserId): Promise<DeleteResult> {
    return await dataSource.getRepository(User).delete(id);
  }
}
