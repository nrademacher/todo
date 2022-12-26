import {
  type NextFunction,
  type Request,
  type Response,
  Router,
} from "express";
import { UserController } from "../controllers";
import { ServerError } from "../utils";
import { body, param } from "express-validator";
import { protect, validate } from "../middlewares";

const userRouter = Router();

userRouter.post("/", [
  body("username").isString().exists(),
  body("password").isStrongPassword().exists(),
  body("email").isEmail().exists(),
  validate,
], async (req: Request, res: Response, next: NextFunction) => {
  try {
    await UserController.createUser(req.body, res);
  } catch (error) {
    next(new ServerError(error.message));
  }
});

userRouter.get(
  "/",
  protect,
  async (_req: Request, res: Response, next: NextFunction) => {
    try {
      await UserController.getUsers(res);
    } catch (error) {
      next(new ServerError(error.message));
    }
  },
);

userRouter.get(
  "/current",
  protect,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await UserController.getUserById(req.user.id, res);
    } catch (error) {
      next(new ServerError(error.message));
    }
  },
);

userRouter.get(
  "/:id",
  [
    protect,
    param("id").isString().exists(),
    validate,
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await UserController.getUserById(req.params.id, res);
    } catch (error) {
      next(new ServerError(error.message));
    }
  },
);

userRouter.patch(
  "/:id",
  [
    protect,
    param("id").isString().exists(),
    body("username").isString().optional(),
    body("password").isStrongPassword().optional(),
    body("email").isEmail().optional(),
    validate,
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await UserController.updateUser(
        req.user.id,
        req.params.id,
        req.body,
        res,
      );
    } catch (error) {
      next(new ServerError(error.message));
    }
  },
);

userRouter.delete("/:id", [
  protect,
  param("id").isString().exists(),
  validate,
], async (req: Request, res: Response, next: NextFunction) => {
  try {
    await UserController.deleteUser(req.user.id, req.params.id, res);
  } catch (error) {
    next(new ServerError(error.message));
  }
});

export { userRouter };
