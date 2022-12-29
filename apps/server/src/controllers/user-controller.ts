import type { Response } from "express";
import {
  type CreateUserParams,
  type UpdateUserParams,
  type UserId,
  UserService,
} from "../services";

export class UserController {
  public static async getUserById(id: UserId, res: Response): Promise<void> {
    const user = await UserService.getUserById(id);
    delete user.passwordHash;
    res.send(user);
  }

  public static async createUser(
    params: CreateUserParams,
    res: Response
  ): Promise<void> {
    const result = await UserService.createUser(params);
    delete result.user.passwordHash;
    res.json(result);
  }

  public static async updateUser(
    id: UserId,
    params: UpdateUserParams,
    res: Response
  ): Promise<void> {
    const user = await UserService.updateUser(id, params);
    delete user.passwordHash;
    res.send(user);
  }

  public static async deleteUser(id: UserId, res: Response): Promise<void> {
    const result = UserService.deleteUser(id);
    res.send(result);
  }
}
