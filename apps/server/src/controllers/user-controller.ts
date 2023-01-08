import type { Response } from "express";
import type { CreateUserParams, UpdateUserParams, UserId } from "../services";
import * as userService from "../services/user-service";

export async function getUserById(id: UserId, res: Response): Promise<void> {
  const user = await userService.getUserById(id);
  if (user == null) {
    throw new Error("User not found");
  }
  const { passwordHash, ...result } = user;
  res.send(result);
}

export async function createUser(
  params: CreateUserParams,
  res: Response,
): Promise<void> {
  try {
    const createResult = await userService.createUser(params);
    const { passwordHash, ...sanitizedUser } = createResult.user;
    res.json({ token: createResult.token, user: sanitizedUser });
  } catch (e) {
    res.status(typeof e.statusCode === "number" ? e.statusCode : 400);
    res.json({ message: e.message });
  }
}

export async function updateUser(
  id: UserId,
  params: UpdateUserParams,
  res: Response,
): Promise<void> {
  const user = await userService.updateUser(id, params);
  if (user == null) {
    throw new Error("User not found");
  }
  const { passwordHash, ...result } = user;
  res.send(result);
}

export async function deleteUser(id: UserId, res: Response): Promise<void> {
  const result = userService.deleteUser(id);
  res.send(result);
}
