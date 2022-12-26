import {
  type NextFunction,
  type Request,
  type Response,
  Router,
} from "express";
import { TodoController } from "../controllers";
import { ServerError } from "../utils";
import { body, param } from "express-validator";
import { handleError, validate } from "../middlewares";

const todoRouter = Router();

todoRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    await TodoController.getTodos(req.user.id, res);
  } catch (error) {
    next(new ServerError(error.message));
  }
});

todoRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await TodoController.getTodoById(Number(req.params.id), res);
    } catch (error) {
      next(new ServerError(error.message));
    }
  },
);

todoRouter.post(
  "/",
  [
    body("done").toBoolean().exists(),
    body("description").isString().exists(),
    validate,
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await TodoController.createTodo(req.body, req.user.id, res);
    } catch (error) {
      next(new ServerError(error.message));
    }
  },
);

todoRouter.patch(
  "/:id",
  [
    param("id").toInt().exists(),
    body("done").toBoolean().optional(),
    body("description").isString().optional(),
    validate,
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await TodoController.updateTodo(Number(req.params.id), req.body, res);
    } catch (error) {
      next(new ServerError(error.message));
    }
  },
);

todoRouter.delete(
  "/:id",
  [param("id").toInt(), validate],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await TodoController.deleteTodo(Number(req.params.id), res);
    } catch (error) {
      next(new ServerError(error.message));
    }
  },
);

todoRouter.use(handleError);

export { todoRouter };
