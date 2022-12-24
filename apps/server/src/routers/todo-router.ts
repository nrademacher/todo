import { type Request, type Response, Router } from "express";
import { TodoController } from "../controllers";

export const todoRouter = Router();

todoRouter.get("/", async (_req: Request, res: Response) => {
  await TodoController.getTodos(res);
});

todoRouter.get("/:id", async function (req: Request, res: Response) {
  await TodoController.getTodoById(Number(req.params.id), res);
});

todoRouter.post("/", async function (req: Request, res: Response) {
  await TodoController.createTodo(req.body, res);
});

todoRouter.patch("/:id", async function (req: Request, res: Response) {
  await TodoController.updateTodo(Number(req.params.id), req.body, res);
});

todoRouter.delete("/:id", async function (req: Request, res: Response) {
  await TodoController.deleteTodo(Number(req.params.id), res);
});
