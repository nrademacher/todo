import { NextFunction, type Request, type Response, Router } from "express";
import { AuthController } from "../controllers";
import { ServerError, ServerErrorTypes } from "../utils";

const authRouter = Router();

authRouter.post(
  "/signin",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await AuthController.signInUser(req.body, res);
    } catch (e) {
      next(new ServerError(e.message, ServerErrorTypes.AUTH));
    }
  },
);

export { authRouter };
