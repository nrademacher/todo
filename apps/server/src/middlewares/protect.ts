import type { NextFunction, Request, Response } from "express";
import { AuthService } from "../services";

export function protect(req: Request, res: Response, next: NextFunction): void {
  const bearer = req.headers.authorization;

  if (!bearer) {
    res.status(401);
    res.json({ message: "Not authorized" });
    return;
  }

  const [, token] = bearer.split(" ");
  if (!token) {
    res.status(401);
    res.json({ message: "Not authorized" });
    return;
  }

  try {
    const user = AuthService.authorizeUser(token);
    req.user = user;
  } catch (e) {
    console.error(e);
    res.status(401);
    res.json({ message: "Not authorized" });
    return;
  }

  next();
}
