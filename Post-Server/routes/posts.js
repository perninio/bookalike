const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Post = require("../models/Post");
const jwtUtils = require("../utils/jwtUtils");
const postUtils = require("../utils/postUtils");

/* POSTS */

// @route GET api/posts/
// @desc get all user's posts (TODO: get all user's and his friend's posts)
// @access Private
router.get("/", (req, res) => {
  if (req.headers["authorization"]) {
    token = req.headers["authorization"];
    data = jwtUtils.verifyToken(token, req.app.locals.publickey);
    if (data.error) {
      res.status(400).json({ error: data.error });
    } else {
      const { id } = data;
      Post.find({ userid: id })
        .then(posts => {
          if (posts) {
            postUtils
              .getPostsData(posts)
              .then(data => res.status(200).send(data))
              .catch(err => {
                console.log(err);
                res.status(404).send();
              });
          } else {
            res.status(404).json({ posts: "Nie znaleziono postów" });
          }
        })
        .catch(err => {
          console.log(err);
          res.status(409).json({ err: err });
        });
    }
  } else {
    res.status(401).send("Wymagana jest autoryzacja");
  }
});

// @route POST api/posts/
// @desc add post to database
// @access Private
router.post("/", (req, res) => {
  if (req.headers["authorization"]) {
    token = req.headers["authorization"];
    data = jwtUtils.verifyToken(token, req.app.locals.publickey);
    if (data.error) {
      res.status(400).json({ error: data.error });
    } else {
      const { id } = data;
      let post = postUtils.getNewPostData(req, id);

      Post.collection
        .insertOne(post)
        .then(() => res.status(200).send())
        .catch(err => {
          console.log(err);
          res.status(409).send();
        });
    }
  } else {
    res.status(401).send("Wymagana jest autoryzacja");
  }
});

// @route PUT api/posts/
// @desc updates the post
// @access Private
router.put("/:postId", (req, res) => {
  if (req.headers["authorization"]) {
    token = req.headers["authorization"];
    data = jwtUtils.verifyToken(token, req.app.locals.publickey);
    if (data.error) {
      res.status(400).json({ error: data.error });
    } else {
      const { id } = data;
      let updatedPost = postUtils.getUpdatedPostData(req);

      Post.findOne({ _id: req.params.postId, userid: id })
        .then(post => {
          post
            .update(updatedPost)
            .then(() => {
              res.status(200).send();
            })
            .catch(err => {
              console.log(err);
              res.status(409).send();
            });
        })
        .catch(err => {
          console.log(err);
          res.status(404).send();
        });
    }
  } else {
    res.status(401).send("Wymagana jest autoryzacja");
  }
});

// @route DELETE api/posts/
// @desc updates the post
// @access Private
router.delete("/:postId", (req, res) => {
  if (req.headers["authorization"]) {
    token = req.headers["authorization"];
    data = jwtUtils.verifyToken(token, req.app.locals.publickey);
    if (data.error) {
      res.status(400).json({ error: data.error });
    } else {
      const { id } = data;

      Post.findOne({ _id: req.params.postId, userid: id })
        .then(post => {
          post
            .remove()
            .then(() => {
              res.status(200).send();
            })
            .catch(err => {
              console.log(err);
              res.status(409).send();
            });
        })
        .catch(err => {
          console.log(err);
          res.status(404).send();
        });
    }
  } else {
    res.status(401).send("Wymagana jest autoryzacja");
  }
});

/* COMMENTS TO THE POST */

// @route POST api/posts/:postId/comment
// @desc add comment to specific post
// @access Private
router.post("/:postId/comment", (req, res) => {
  if (req.headers["authorization"]) {
    token = req.headers["authorization"];
    data = jwtUtils.verifyToken(token, req.app.locals.publickey);
    if (data.error) {
      res.status(400).json({ error: data.error });
    } else {
      const { id } = data;
      const { comment } = req.body;
      let newComment = {
        _id: mongoose.Types.ObjectId(),
        comment: comment,
        userid: id
      };

      Post.findOneAndUpdate(
        { _id: req.params.postId },
        { $push: { comments: newComment } }
      )
        .then(() => {
          res.status(200).send();
        })
        .catch(err => {
          console.log(err);
          res.status(404).send();
        });
    }
  } else {
    res.status(401).send("Wymagana jest autoryzacja");
  }
});

// @route PUT api/posts/:postId/comment
// @desc add comment to specific post
// @access Private
router.put("/:postId/comment/:commentId", (req, res) => {
  if (req.headers["authorization"]) {
    token = req.headers["authorization"];
    data = jwtUtils.verifyToken(token, req.app.locals.publickey);
    if (data.error) {
      res.status(400).json({ error: data.error });
    } else {
      const { id } = data;
      const { comment } = req.body;

      Post.updateOne(
        {
          _id: req.params.postId,
          "comments._id": req.params.commentId,
          "comments.userid": id
        },
        { $set: { "comments.$.comment": comment } }
      )
        .then(post => {
          if (post.nModified > 0) {
            res.status(200).send();
          } else {
            res.status(409).send();
          }
        })
        .catch(err => {
          console.log(err);
          res.status(404).send();
        });
    }
  } else {
    res.status(401).send("Wymagana jest autoryzacja");
  }
});

// @route DELETE api/posts/:postId/comment
// @desc add comment to specific post
// @access Private
router.delete("/:postId/comment/:commentId", (req, res) => {
  if (req.headers["authorization"]) {
    token = req.headers["authorization"];
    data = jwtUtils.verifyToken(token, req.app.locals.publickey);
    if (data.error) {
      res.status(400).json({ error: data.error });
    } else {
      const { id } = data;

      Post.updateOne(
        {
          _id: req.params.postId,
          "comments.userid": id
        },
        {
          $pull: { comments: { _id: req.params.commentId } }
        }
      )
        .then(post => {
          console.log(post);
          if (post.nModified > 0) {
            res.status(200).send();
          } else {
            res.status(409).send();
          }
        })
        .catch(err => {
          console.log(err);
          res.status(404).send();
        });
    }
  } else {
    res.status(401).send("Wymagana jest autoryzacja");
  }
});

module.exports = router;
