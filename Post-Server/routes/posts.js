const express = require("express");
const router = express.Router();

const Post = require("../models/Post");

router.get("/", (req, res) => {
  Post.find({}, (err, users) => {
    res.send(users);
  });
});

router.post("/", (req, res) => {
  const { title, author } = req.body;
  let post = { title: title, author: author };
  Post.collection.insertOne(post);
  res.send("Pozytywnie dodano");
});

module.exports = router;
