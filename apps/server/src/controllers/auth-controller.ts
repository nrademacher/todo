import { signInUser as authenticateUser, SignInUserParams } from "../services";
import type { Response } from "express";

export async function signInUser(
  params: SignInUserParams,
  res: Response
): Promise<void> {
  try {
    const token = await authenticateUser(params);
    res.json({ token });
  } catch (e) {
    res.status(typeof e.statusCode === "number" ? e.statusCode : 401);
    res.json({ message: e.message });
  }
}
