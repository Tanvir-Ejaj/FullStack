require("dotenv").config();
const express = require("express");
const router = require("./routes");
const app = express();
const mongoConfig = require("./config/mongoConfig");

app.use(express.json());

mongoConfig();

app.use("/", router);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("port runnig");
});
