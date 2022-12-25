import { AuthorizationError, AuthService, SignInUserParams } from "../services";
import type { Response } from "express";

export class AuthController {
  public static async signInUser(
    params: SignInUserParams,
    res: Response,
  ): Promise<void> {
    try {
      const token = await AuthService.signInUser(params);
      res.json({ token });
    } catch (e) {
      if (e instanceof AuthorizationError) {
        res.status(e.statusCode);
        res.json({ message: e.message });
      } else {
        console.error(e)
        res.status(401);
        res.json({ message: "Not authorized" });
      }
    }
  }
}
