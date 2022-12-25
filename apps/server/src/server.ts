import { config } from 'dotenv'
config()

import express from "express";
import morgan from "morgan";
import cors from "cors";
import { appRouter } from "./routers";

const app = express();

app.use(morgan("dev"));

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/", appRouter);

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});
