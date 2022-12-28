import * as dotenv from "dotenv";
dotenv.config();

import express from "express";
import morgan from "morgan";
import cors from "cors";
import { appRouter } from "./routers";
import { handleError } from "./middlewares";

const app = express();

app.use(morgan("dev"));

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", appRouter);

app.use(handleError);

export { app }
