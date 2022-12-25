import type { UserAuthPayload } from "../../services";

declare global {
  namespace Express {
    interface Request {
      user?: UserAuthPayload;
    }
  }
}
