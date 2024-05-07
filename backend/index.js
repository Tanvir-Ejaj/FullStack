require("dotenv").config();
const express = require("express");
const router = require("./routes");
var cors = require("cors");
const mongoConfig = require("./config/mongoConfig");
const path = require('path')
const app = express();

mongoConfig();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')))
app.use("/", router);

const port = process.env.PORT || 8000;

app.listen(port, () => {
  console.log("port runnig");
});
