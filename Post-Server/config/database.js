const mongoose = require("mongoose");
const Host = process.env.PS_DB_IP_ADDR || "localhost";

mongoose
  .connect("mongodb://" + Host + ":27017/bookalike?authSource=admin", {
    user: "admin",
    pass: "admin"
  })
  .then(console.log("Połączenie ustanowione"))
  .catch(err => console.log("Błąd w połączeniu: ", err));
