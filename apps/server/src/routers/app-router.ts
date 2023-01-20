import { type Request, type Response, Router } from "express";
import { handleError, protect } from "../middlewares";
import { authRouter } from "./auth-router";
import { todoRouter } from "./todo-router";
import { userRouter } from "./user-router";

const appRouter = Router();

appRouter.use("/auth", authRouter);
appRouter.use("/user", userRouter);
appRouter.use("/todos", protect, todoRouter);

appRouter.get("/", (_req: Request, res: Response) => {
  res.redirect("/user");
});
appRouter.get("/favicon.ico", (_req: Request, res: Response) =>
  res.sendStatus(204).end()
);

appRouter.use(handleError);

export { appRouter };
