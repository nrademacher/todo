import { config } from "dotenv";
config();

import express, { Request, Response } from "express";
import morgan from "morgan";
import cors from "cors";
import { appRouter } from "./routers";
import type { ServerError } from "./utils";

const app = express();

app.use(morgan("dev"));

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", appRouter);

app.use((err: ServerError, _req: Request, res: Response) => {
  res.status(err.statusCode).json({ error: err.message });
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
