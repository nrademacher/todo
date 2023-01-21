import {
  type NextFunction,
  type Request,
  type Response,
  Router,
} from "express";
import {
  createTodo,
  deleteTodo,
  getTodoById,
  getTodos,
  updateTodo,
} from "../controllers";
import { ServerError } from "../utils";
import { body, param } from "express-validator";
import { handleError, validate } from "../middlewares";

const todoRouter = Router();

todoRouter.get("/", async (req: Request, res: Response, next: NextFunction) => {
  try {
    if (req.user == null) {
      throw new Error("Authorization failure");
    }
    await getTodos(req.user.id, res);
  } catch (error) {
    next(new ServerError(error.message));
  }
});

todoRouter.get(
  "/:id",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.user == null) {
        throw new Error("Unexpected authentication failure");
      }
      await getTodoById(req.user.id, Number(req.params.id), res);
    } catch (error) {
      next(new ServerError(error.message));
    }
  }
);

todoRouter.post(
  "/",
  [
    body("done").toBoolean().exists(),
    body("title").isString().isLength({ min: 1 }).exists(),
    body("description").isString().isLength({ min: 1 }).optional(),
    validate,
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.user == null) {
        throw new Error("Unexpected authentication failure");
      }
      await createTodo(req.body, req.user.id, res);
    } catch (error) {
      next(new ServerError(error.message));
    }
  }
);

todoRouter.patch(
  "/:id",
  [
    param("id").toInt().exists(),
    body("done").toBoolean().optional(),
    body("title").isString().isLength({ min: 1 }).optional(),
    body("description").isString().isLength({ min: 1 }).optional(),
    validate,
  ],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.user == null) {
        throw new Error("Unexpected authentication failure");
      }
      await updateTodo(req.user.id, Number(req.params.id), req.body, res);
    } catch (error) {
      next(new ServerError(error.message));
    }
  }
);

todoRouter.delete(
  "/:id",
  [param("id").toInt(), validate],
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      if (req.user == null) {
        throw new Error("Unexpected authentication failure");
      }
      await deleteTodo(req.user.id, Number(req.params.id), res);
    } catch (error) {
      next(new ServerError(error.message));
    }
  }
);

todoRouter.use(handleError);

export { todoRouter };
