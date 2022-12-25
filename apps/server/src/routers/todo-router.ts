import { type Request, type Response, Router } from "express";
import { TodoController } from "../controllers";

const todoRouter = Router();

todoRouter.get("/", async (req: Request, res: Response) => {
  await TodoController.getTodos(req.user.id, res);
});

todoRouter.get("/:id", async (req: Request, res: Response) => {
  await TodoController.getTodoById(Number(req.params.id), res);
});

todoRouter.post("/", async (req: Request, res: Response) => {
  await TodoController.createTodo(req.body, req.user.id, res);
});

todoRouter.patch("/:id", async (req: Request, res: Response) => {
  await TodoController.updateTodo(Number(req.params.id), req.body, res);
});

todoRouter.delete("/:id", async (req: Request, res: Response) => {
  await TodoController.deleteTodo(Number(req.params.id), res);
});

export { todoRouter };
