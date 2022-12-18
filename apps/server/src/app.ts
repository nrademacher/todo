import express, { Request, Response } from "express";
import cors from "cors";
import { dataSource } from "./app-data-source";
import { User } from "./entity/user.entity";
// import { runSeeders } from "typeorm-extension";

// establish database connection
dataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  /* .then(() => {
    if (process.env.NODE_ENV === "development") {
      runSeeders(dataSource).then(() =>
        console.log("Database has been seeded!")
      );
    }
  }) */
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

export const app = express();

app.use(express.json());

app.use(cors());

app.get("/todos", (_req, res: Response) => {
  const todos = ["Buy coffee", "Write code", "Exercise"];
  res.send(todos);
});

app.get("/users", async (_req: Request, res: Response) => {
  const users = await dataSource.getRepository(User).find();
  res.send(users);
});

app.get("/users/:id", async function (req: Request, res: Response) {
  const results = await dataSource.getRepository(User).findOneBy({
    id: Number(req.params.id),
  });
  res.send(results);
});

app.post("/users", async function (req: Request, res: Response) {
  const user = dataSource.getRepository(User).create(req.body);
  const results = await dataSource.getRepository(User).save(user);
  res.send(results);
});

app.put("/users/:id", async function (req: Request, res: Response) {
  const user = await dataSource.getRepository(User).findOneBy({
    id: Number(req.params.id),
  });
  dataSource.getRepository(User).merge(user, req.body);
  const results = await dataSource.getRepository(User).save(user);
  res.send(results);
});

app.delete("/users/:id", async function (req: Request, res: Response) {
  const results = await dataSource.getRepository(User).delete(req.params.id);
  res.send(results);
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`server on ${PORT}`);
});
