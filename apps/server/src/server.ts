import * as dotenv from "dotenv";
dotenv.config();
import { config } from "./configs";

import express from "express";
import morgan from "morgan";
import cors from "cors";
import { appRouter } from "./routers";
import { handleError } from "./middlewares";
import { dataSource } from "./database";

dataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

const app = express();

app.use(morgan("dev"));

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", appRouter);

app.use(handleError);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
