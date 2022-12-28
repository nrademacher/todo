import { dataSource } from "./database";
import { app } from "./app";
import { config } from "./configs";

dataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
});
