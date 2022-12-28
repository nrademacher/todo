import type { EnvConfig } from ".";

const testingConfig: EnvConfig = {
  secrets: {
    db: {
      port: 3307,
    },
  },
};

export default testingConfig;
