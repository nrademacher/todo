import { AuthService, SignInUserParams } from "../services";
import type { Response } from "express";

export class AuthController {
  public static async signInUser(
    params: SignInUserParams,
    res: Response
  ): Promise<void> {
    try {
      const token = await AuthService.signInUser(params);
      res.json({ token });
    } catch (e) {
      res.status(e.statusCode || 401);
      res.json({ message: e.message });
    }
  }
}
