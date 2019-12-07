const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const axios = require("axios");

const Post = require("../models/Post");
const jwtUtils = require("../utils/jwtUtils");
const postUtils = require("../utils/postUtils");

/* POSTS */

// @route GET api/posts/
// @desc get all user's + friend's posts
// @access Private
router.get("/", (req, res) => {
  if (req.headers["authorization"]) {
    token = req.headers["authorization"];
    data = jwtUtils.verifyToken(token, req.app.locals.publickey);
    if (data.error) {
      res.status(400).json({ error: data.error });
    } else {
      const { id } = data;
      axios
        .get(
          "http://" +
            process.env.WS_IP_ADDR +
            ":5000/api/user/" +
            id +
            "/friends"
        )
        .then(resp => {
          const {
            data: { friends }
          } = resp;
          friends.push(id);
          Post.find({ userid: { $in: friends } })
            .then(posts => {
              if (posts) {
                postUtils
                  .getPostsData(posts, id)
                  .then(data =>
                    res
                      .status(200)
                      .json({ posts: data.filter(post => post != null) })
                  )
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
        })
        .catch(err => {
          console.log(err);
          res.status(500).send();
        });
    }
  } else {
    res.status(401).send("Wymagana jest autoryzacja");
  }
});

// @route GET api/posts/book/:bookid/average-rate
// @desc get average rate for book
// @access Public
router.get("/book/:bookid/average-rate", (req, res) => {
  Post.find({ bookid: req.params.bookid })
    .then(posts => {
      const rates = posts.map(post => {
        return post.rate;
      });
      if (rates.length > 0) {
        const sum_rates = rates.reduce((total, value) => {
          return total + value;
        });
        const amount = posts.length;
        const rate = sum_rates / amount;
        res.status(200).json({ rate: rate });
      } else {
        res.status(200).json({ rate: 0 });
      }
    })
    .catch(err => {
      console.log(err);
      res.status(200).json({ rate: 0 });
    });
});

// @route GET api/posts/user/:userid
// @desc get all user's posts
// @access Public/Private
router.get("/user/:userid", (req, res) => {
  if (req.headers["authorization"]) {
    token = req.headers["authorization"];
    data = jwtUtils.verifyToken(token, req.app.locals.publickey);
    if (data.error) {
      res.status(400).json({ error: data.error });
    } else {
      const { id } = data;
      axios
        .get(
          "http://" +
            process.env.WS_IP_ADDR +
            ":5000/api/user/" +
            req.params.userid +
            "/friends"
        )
        .then(resp => {
          const {
            data: { friends }
          } = resp;
          if (req.params.userid == id) {
            Post.find({ userid: req.params.userid }).then(posts => {
              if (posts) {
                postUtils
                  .getPostsData(posts, id)
                  .then(data =>
                    res
                      .status(200)
                      .json({ posts: data.filter(post => post != null) })
                  )
                  .catch(err => {
                    console.log(err);
                    res.status(404).send();
                  });
              } else {
                res.status(404).json({ posts: "Nie znaleziono postów" });
              }
            });
          } else if (friends.includes(id)) {
            Post.find({
              userid: req.params.userid,
              scope: { $in: ["public", "friends"] }
            })
              .then(posts => {
                if (posts) {
                  postUtils
                    .getPostsData(posts, id)
                    .then(data =>
                      res
                        .status(200)
                        .json({ posts: data.filter(post => post != null) })
                    )
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
                res.status(404).send();
              });
          } else if (!friends.includes(id)) {
            Post.find({ userid: req.params.userid, scope: "public" })
              .then(posts => {
                if (posts) {
                  postUtils
                    .getPostsData(posts, id)
                    .then(data =>
                      res
                        .status(200)
                        .json({ posts: data.filter(post => post != null) })
                    )
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
                res.status(404).send();
              });
          }
        })
        .catch(err => {
          console.log(err);
          res.status(404).send();
        });
    }
  } else {
    Post.find({ userid: req.params.userid, scope: "public" })
      .then(posts => {
        if (posts) {
          postUtils
            .getPostsData(posts, -1)
            .then(data =>
              res.status(200).json({ posts: data.filter(post => post != null) })
            )
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
        res.status(404).send();
      });
  }
});

// @route GET api/posts/book/:bookid
// @desc get all book's posts
// @access Public/Private
router.get("/book/:bookid", (req, res) => {
  if (req.headers["authorization"]) {
    token = req.headers["authorization"];
    data = jwtUtils.verifyToken(token, req.app.locals.publickey);
    if (data.error) {
      res.status(400).json({ error: data.error });
    } else {
      const { id } = data;
      axios
        .get(
          "http://" +
            process.env.WS_IP_ADDR +
            ":5000/api/user/" +
            id +
            "/friends"
        )
        .then(resp => {
          const {
            data: { friends }
          } = resp;

          Post.find()
            .or([
              { userid: id },
              { userid: { $in: friends }, scope: { $in: ["friends"] } },
              { scope: "public" }
            ])
            .then(posts => {
              if (posts) {
                postUtils
                  .getPostsData(posts, -1)
                  .then(data =>
                    res
                      .status(200)
                      .json({ posts: data.filter(post => post != null) })
                  )
                  .catch(err => {
                    console.log(err);
                    res.status(404).send();
                  });
              } else {
                res.status(404).send();
              }
            })
            .catch(err => {
              console.log(err);
              res.status(404).send();
            });
        })
        .catch(err => {
          console.log(err);
          res.status(404).send();
        });
    }
  } else {
    Post.find({ bookid: req.params.bookid, scope: "public" })
      .then(posts => {
        if (posts) {
          console.log(posts);
          postUtils
            .getPostsData(posts, -1)
            .then(data =>
              res.status(200).json({ posts: data.filter(post => post != null) })
            )
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
        res.status(404).send();
      });
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
      let post = req.body;
      post["userid"] = id;
      console.log(post);

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
      let updatedPost = req.body;

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

// @route PUT api/posts/:postId/comment/:commentId
// @desc updates specific comment
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

// @route DELETE api/posts/:postId/comment/:commentId
// @desc deletes specific comment
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
