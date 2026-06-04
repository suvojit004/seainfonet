const { cleanEnv, str, port } = require("envalid");

const env = cleanEnv(process.env, {
  NODE_ENV: str({
    default: "development",
  }),
  PORT: port({
    default: 3000,
  }),
  MONGO_URI: str(),
});

module.exports = env;