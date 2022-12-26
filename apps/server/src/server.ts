import { config } from "dotenv";
config();

import express, { Request, Response } from "express";
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

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
