import express from "express";
import morgan from "morgan";
import cors from "cors";
import { appRouter } from "./routers";
import { handleError } from "./middlewares";
import { config } from "./configs";

const app = express();

const logFormat = config.env !== "production" ? "dev" : "combined"
app.use(morgan(logFormat));

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", appRouter);

app.use(handleError);

export { app };
