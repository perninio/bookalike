const express = require("express");
const bodyParser = require("body-parser");
const path = require("path");
const cors = require("cors");

const books = require("./routes/books");

const app = express();
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use("/api/books", books);

const port = process.env.PORT || 5000;

app.listen(port, () => console.log(`Server running on port ${port}`));
