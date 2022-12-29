import {
  type NextFunction,
  type Request,
  type Response,
  Router,
} from "express";
import { UserController } from "../controllers";
import { ServerError } from "../utils";
import { body } from "express-validator";
import { handleError, protect, validate } from "../middlewares";

const userRouter = Router();

userRouter.post(
  "/",
  [
    body("username").isString().exists(),
    body("password").isStrongPassword().exists(),
    body("email").isEmail().exists(),
    validate,
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await UserController.createUser(req.body, res);
    } catch (err) {
      next(new ServerError(err.message));
    }
  }
);

userRouter.get(
  "/",
  protect,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await UserController.getUserById(req.user.id, res);
    } catch (err) {
      next(new ServerError(err.message));
    }
  }
);

userRouter.patch(
  "/",
  [
    protect,
    body("username").isString().optional(),
    body("password").isStrongPassword().optional(),
    body("email").isEmail().optional(),
    validate,
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await UserController.updateUser(req.user.id, req.body, res);
    } catch (err) {
      next(new ServerError(err.message));
    }
  }
);

userRouter.delete(
  "/",
  protect,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await UserController.deleteUser(req.user.id, res);
    } catch (err) {
      next(new ServerError(err.message));
    }
  }
);

userRouter.use(handleError);

export { userRouter };
