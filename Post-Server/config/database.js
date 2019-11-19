const mongoose = require("mongoose");
const Host = process.env.PS_DB_IP_ADDR || "localhost";

mongoose
  .connect("mongodb://" + Host + ":27017/bookalike?authSource=admin", {
    user: "admin",
    pass: "admin"
  })
  .then(console.log("OK"))
  .catch(err => console.log(err));
