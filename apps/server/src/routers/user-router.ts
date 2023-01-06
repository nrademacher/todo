import {
  type NextFunction,
  type Request,
  type Response,
  Router,
} from "express";
import {
  createUser,
  deleteUser,
  getUserById,
  updateUser,
} from "../controllers";
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
      await createUser(req.body, res);
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
      if (req.user == null) {
        throw new Error("Unexpected authentication failure");
      }
      await getUserById(req.user.id, res);
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
      if (req.user == null) {
        throw new Error("Unexpected authentication failure");
      }
      await updateUser(req.user.id, req.body, res);
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
      if (req.user == null) {
        throw new Error("Unexpected authentication failure");
      }
      await deleteUser(req.user.id, res);
    } catch (err) {
      next(new ServerError(err.message));
    }
  }
);

userRouter.use(handleError);

export { userRouter };
