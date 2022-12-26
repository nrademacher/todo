import type { ServerError } from "../utils";
import type { Request, Response } from "express";

export function handleError(
  err: ServerError,
  _req: Request,
  res: Response,
): void {
  res.status(err.statusCode).json({ error: err.message });
}
