import type { Response } from "express";
import {
  type CreateUserParams,
  type UpdateUserParams,
  type UserId,
  UserService,
} from "../services";

export class UserController {
  public static async getUsers(res: Response): Promise<void> {
    const users = await UserService.getUsers();
    for (const user of users) {
      delete user.passwordHash;
    }
    res.send(users);
  }

  public static async getUserById(id: UserId, res: Response): Promise<void> {
    const user = await UserService.getUserById(id);
    delete user.passwordHash;
    res.send(user);
  }

  public static async createUser(
    params: CreateUserParams,
    res: Response,
  ): Promise<void> {
    const token = await UserService.createUser(params);
    res.json({ token });
  }

  public static async updateUser(
    reqId: UserId,
    id: UserId,
    params: UpdateUserParams,
    res: Response,
  ): Promise<void> {
    if (reqId !== id) {
      res.sendStatus(403);
      return;
    }
    const user = await UserService.updateUser(id, params);
    delete user.passwordHash;
    res.send(user);
  }

  public static async deleteUser(
    reqId: UserId,
    id: UserId,
    res: Response,
  ): Promise<void> {
    if (reqId !== id) {
      res.sendStatus(403);
      return;
    }
    const result = UserService.deleteUser(id);
    res.send(result);
  }
}
