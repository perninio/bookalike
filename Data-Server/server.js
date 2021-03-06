const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const books = require("./routes/books");
const users = require("./routes/users");
const rates = require("./routes/rates");
const book_users = require("./routes/book_users");

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/books", books);
app.use("/api/users", users);
app.use("/api/rates", rates);
app.use("/api/book-user", book_users);

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
