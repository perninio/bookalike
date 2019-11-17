const express = require("express");
const router = express.Router();

const Comment = require("../models/Comment");

router.get("/", (req, res) => {
  Comment.find({}, (err, users) => {
    res.send(users);
  });
});

router.post("/", (req, res) => {
  const { title, author } = req.body;
  let post = { title: title, author: author };
  Comment.collection.insertOne(post);
  res.send("Pozytywnie dodano");
});

module.exports = router;
