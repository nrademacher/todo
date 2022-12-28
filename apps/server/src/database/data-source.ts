import { DataSource, type DataSourceOptions } from "typeorm";
import { config } from "../configs";

const dataSourceOptions: DataSourceOptions = {
  type: "mysql",
  host: config.secrets.db.host,
  port: config.secrets.db.port,
  username: config.secrets.db.username,
  password: config.secrets.db.password,
  database: config.secrets.db.name,
  entities: ["src/database/entities/*.entity.ts"],
  migrations: [],
  logging: true,
  synchronize: config.env !== "production",
};

export const dataSource = new DataSource(dataSourceOptions);
