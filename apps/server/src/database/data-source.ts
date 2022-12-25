import { config } from "dotenv";
import { DataSource, type DataSourceOptions } from "typeorm";
import { Init1671750857918 } from "./migrations/1671750857918-Init";
import { changeFirstname1671751702607 } from "./migrations/1671751702607-change_firstname";

// Env variables need to be loaded here in case this file is loaded via the typeorm CLI
config()

const dataSourceOptions: DataSourceOptions = {
  type: "mysql",
  host: process.env.DB_HOST,
  port: 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  entities: ["src/database/entities/*.entity.ts"],
  migrations: [Init1671750857918, changeFirstname1671751702607],
  logging: true,
  synchronize: process.env.NODE_ENV === 'development' ? true : false,
};

export const dataSource = new DataSource(dataSourceOptions);

dataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!");
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err);
  });

