require("dotenv").config();
const env = require("./src/config/env");

const app = require("./src/app");
const connectDB = require("./src/config/db");

connectDB();

const PORT = env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});