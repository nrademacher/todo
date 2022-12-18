import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";

const dataSourceOptions: DataSourceOptions & SeederOptions = {
  type: "mysql",
  host: "localhost",
  port: 3306,
  username: "root",
  password: "mauFJcuf5dhRMQrjj",
  database: "todo",
  entities: ["src/entity/*.entity.ts"],
  factories: ["src/entity/*.factory.ts"],
  seeds: ["src/entity/*.seeder.ts"],
  logging: true,
  synchronize: true,
};

export const dataSource = new DataSource(dataSourceOptions);
