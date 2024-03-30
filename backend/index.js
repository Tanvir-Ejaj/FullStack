require("dotenv").config();
const express = require("express");
const router = require("./routes");
var cors = require("cors");
const app = express();
const mongoConfig = require("./config/mongoConfig");

mongoConfig();
app.use(cors());
app.use(express.json());
app.use("/", router);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("port runnig");
});
