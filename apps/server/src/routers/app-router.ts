import { Router } from "express";
import { todoRouter } from "./todo-router";
import { userRouter } from "./user-router";

const appRouter = Router()

appRouter.use('/users', userRouter)
appRouter.use('/todos', todoRouter)

export { appRouter }
