import type { DeepPartial } from "typeorm";
import merge from "lodash.merge";

process.env.NODE_ENV = process.env.NODE_ENV || "development";

const stage = process.env.STAGE || "local";

type Config = {
  stage: string;
  env: string;
  port: number;
  secrets: {
    jwt: string;
    db: {
      port: number,
      host: string;
      name: string;
      password: string;
    };
  };
};

export type EnvConfig = DeepPartial<Config>

const baseConfig: Config = {
  stage,
  env: process.env.NODE_ENV,
  port: Number(process.env.PORT),
  secrets: {
    jwt: process.env.JWT_SECRET,
    db: {
      port: 3306,
      host: process.env.DB_HOST,
      name: process.env.DB_NAME,
      password: process.env.DB_PASSWORD,
    },
  },
};

let envConfig: Config;
if (stage === "production") {
  envConfig = require("./prod").default;
} else if (stage === "testing") {
  envConfig = require("./testing").default;
} else {
  envConfig = require("./local").default;
}

export const config = merge(baseConfig, envConfig);
