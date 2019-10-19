const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post("/server/init", (req, res) => {
  if (app.locals.token || app.locals.publickey) {
    res.status(500);
  } else {
    app.locals.token = req.body.token;
    app.locals.publickey = req.body.publickey;
    res.status(200).send();
    console.log("RECIEVED TOKEN & PUBLIC KEY");
  }
});

app.use(express.static("./build/"));

app.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./build/index.html"));
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
