const mongoose = require("mongoose");

let mongoConfig = () => {
  mongoose
    .connect(
      "mongodb+srv://TanvirEjajTushar:Tanvir_Ejaj_Tushar@tushar.fkrdtvz.mongodb.net/ecommerce?retryWrites=true&w=majority"
    )
    .then(() => console.log("Database Connected!"));
};

module.exports = mongoConfig;
