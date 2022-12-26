import { type Request, type Response, Router } from "express";
import { body } from "express-validator";
import { UserController } from "../controllers";
import { protect, validate } from "../middlewares";

const userRouter = Router();

userRouter.post("/", [
  body("username").isString(),
  body("password").isStrongPassword(),
  body("email").isEmail(),
  validate,
], async (req: Request, res: Response) => {
  await UserController.createUser(req.body, res);
});

userRouter.get("/", protect, async (_req: Request, res: Response) => {
  await UserController.getUsers(res);
});

userRouter.get("/current", protect, async (req: Request, res: Response) => {
  await UserController.getUserById(req.user.id, res);
});

userRouter.get("/:id", protect, async (req: Request, res: Response) => {
  await UserController.getUserById(req.params.id, res);
});

userRouter.patch(
  "/:id",
  [
    body("username").isString().optional(),
    body("password").isStrongPassword().optional(),
    body("email").isEmail().optional(),
    validate,
  ],
  protect,
  async (req: Request, res: Response) => {
    await UserController.updateUser(req.params.id, req.body, res);
  },
);

userRouter.delete("/:id", protect, async (req: Request, res: Response) => {
  await UserController.deleteUser(req.params.id, res);
});

export { userRouter };
