import { type Request, type Response, Router } from "express";
import { AuthController } from "../controllers";

const authRouter = Router();

authRouter.get("/signin", async (req: Request, res: Response) => {
  await AuthController.signInUser(req.body, res);
});

export { authRouter }
