import { type Request, type Response, Router } from "express";
import { UserController } from "../controllers";

export const userRouter = Router();

userRouter.get("/", async (_req: Request, res: Response) => {
  await UserController.getUsers(res);
});

userRouter.get("/:id", async function (req: Request, res: Response) {
  await UserController.getUserById(Number(req.params.id), res);
});

userRouter.post("/", async function (req: Request, res: Response) {
  await UserController.createUser(req.body, res);
});

userRouter.put("/:id", async function (req: Request, res: Response) {
  await UserController.updateUser(Number(req.params.id), req.body, res);
});

userRouter.delete("/:id", async function (req: Request, res: Response) {
  await UserController.deleteUser(Number(req.params.id), res);
});
