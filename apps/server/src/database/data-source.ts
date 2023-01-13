import { DataSource, type DataSourceOptions } from "typeorm";
import { config } from "../configs";
import { join } from "path";

const dataSourceOptions: DataSourceOptions = {
  type: "mysql",
  host: config.secrets.db.host,
  port: config.secrets.db.port,
  username: config.secrets.db.username,
  password: config.secrets.db.password,
  database: config.secrets.db.name,
  entities: [join(__dirname, "entities/*.entity{.js,.ts}")],
  migrations: [join(__dirname, "migrations/*.{.js,.ts}")],
  logging: config.stage !== "testing",
  synchronize: config.env !== "production",
};

export const dataSource = new DataSource(dataSourceOptions);
