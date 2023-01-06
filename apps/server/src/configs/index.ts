import * as dotenv from "dotenv";
import type { DeepPartial } from "typeorm";
import env from "env-var";
import merge from "lodash.merge";

dotenv.config();

if (process.env.NODE_ENV === undefined) {
  process.env.NODE_ENV = "development";
}

interface Config {
  stage: string;
  env: string;
  port: number;
  secrets: {
    jwt: string;
    db: {
      port: number;
      host: string;
      name: string;
      username: string;
      password: string;
    };
  };
}

export type EnvConfig = DeepPartial<Config>;

const stage = env.get("STAGE").required().asString();

const baseConfig: Config = {
  stage,
  env: env.get("NODE_ENV").required().asString(),
  port: env.get("PORT").required().asInt(),
  secrets: {
    jwt: env.get("JWT_SECRET").required().asString(),
    db: {
      host: env.get("DB_HOST").required().asString(),
      port: env.get("DB_PORT").required().asInt(),
      name: env.get("DB_NAME").required().asString(),
      username: env.get("DB_USERNAME").required().asString(),
      password: env.get("DB_PASSWORD").required().asString(),
    },
  },
};

let envConfig: Config;
if (stage === "production") {
  /* eslint-disable @typescript-eslint/no-var-requires */
  envConfig = require("./prod").default;
} else if (stage === "testing") {
  envConfig = require("./testing").default;
} else {
  envConfig = require("./local").default;
  /* eslint-enable @typescript-eslint/no-var-requires */
}

export const config = merge(baseConfig, envConfig);
