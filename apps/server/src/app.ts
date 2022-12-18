import express from "express";
import cors from "cors";

const app = express();

app.use(cors());

app.get("/", (_req, res) => {
  res.status(200);
  const todos = ["Buy coffee", "Write code", "Exercise"];
  res.json(todos);
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});
