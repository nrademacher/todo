import type { EnvConfig } from ".";

const prodConfig: EnvConfig = {
  port: Number(process.env.PORT),
};

export default prodConfig;
