const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const database = require("./config/database");

const posts = require("./routes/posts");
const comments = require("./routes/comments");

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/posts", posts);
app.use("/api/comments", comments);

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
