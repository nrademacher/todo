import { NextFunction, type Request, type Response, Router } from "express";
import { body } from "express-validator";
import { handleError, validate } from "../middlewares";
import { signInUser } from "../controllers";
import { ServerError, ServerErrorTypes } from "../utils";

const authRouter = Router();

authRouter.post(
  "/signin",
  [
    body("email").isEmail().exists(),
    body("password").isLength({ min: 1 }).exists(),
    validate,
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await signInUser(req.body, res);
    } catch (e) {
      next(new ServerError(e.message, ServerErrorTypes.AUTH));
    }
  }
);

authRouter.use(handleError);

export { authRouter };
