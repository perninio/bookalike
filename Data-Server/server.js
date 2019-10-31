const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const books = require("./routes/books");

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/books", books);

app.post("/server/init", (req, res) => {
  if (app.locals.token || app.locals.publickey) {
    res.status(500);
  } else {
    app.locals.token = req.body.token;
    app.locals.publickey = req.body.publickey;
    console.log("RECIEVED TOKEN & PUBLIC KEY");
    res.status(200).send();
  }
});

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
