import { Router } from "express";
import { protect } from "../middlewares";
import { authRouter } from "./auth-router";
import { todoRouter } from "./todo-router";
import { userRouter } from "./user-router";

const appRouter = Router()

appRouter.use('/auth', authRouter)
appRouter.use('/users', userRouter)
appRouter.use('/todos', protect, todoRouter)

export { appRouter }
