const express = require("express");
const router = express.Router();

const Book_User = require("../models/Book_User");
const jwtUtils = require("../utils/jwtUtils");

// @route GET api/book-user/
// @desc get all books interactions for user
// @access Private
router.get("/", (req, res) => {
  if (req.headers["authorization"]) {
    token = req.headers["authorization"];
    data = jwtUtils.verifyToken(token, req.app.locals.publickey);
    if (data.error) {
      res.status(400).json({ error: data.error });
    } else {
      const { id } = data;
      Book_User.findAll({ where: { userid: id } })
        .then(books_user => {
          if (books_user) {
            res.status(200).json({ data: books_user });
          } else {
            res.status(404).json({ rates: "Nie masz żadnych książek" });
          }
        })
        .catch(err => console.log(err));
    }
  } else {
    res.status(401).send("Wymagana jest autoryzacja");
  }
});

// @route GET api/book-user/book/:bookid
// @desc get user interaction with specific book
// @access Private
router.get("/book/:bookid", (req, res) => {
  if (req.headers["authorization"]) {
    token = req.headers["authorization"];
    data = jwtUtils.verifyToken(token, req.app.locals.publickey);
    if (data.error) {
      res.status(400).json({ error: data.error });
    } else {
      const { id } = data;
      Book_User.findOne({ where: { userid: id, bookid: req.params.bookid } })
        .then(interaction => {
          if (interaction) {
            res.status(200).json({ data: interaction });
          } else {
            res
              .status(404)
              .json({ interaction: "Nie masz oceny dla tej książki" });
          }
        })
        .catch(err => console.log(err));
    }
  } else {
    res.status(401).send("Wymagana jest autoryzacja");
  }
});

// @route POST api/book-user/
// @desc post a interaction with book, or update currently existing one - it's a bad practice
// @access Private
router.post("/", (req, res) => {
  if (req.headers["authorization"]) {
    token = req.headers["authorization"];
    data = jwtUtils.verifyToken(token, req.app.locals.publickey);
    if (data.error) {
      res.status(400).json({ error: data.error });
    } else {
      const { id } = data;
      const req_data = req.body;
      req_data["userid"] = id;
      Book_User.findOne({ where: { userid: id, bookid: req_data.bookid } })
        .then(interaction => {
          if (interaction) {
            interaction
              .update(req_data)
              .then(res.status(200).send())
              .catch(err => {
                console.log(err);
                res.status(400).send();
              });
          } else {
            Book_User.create(req_data)
              .then(res.status(200).send())
              .catch(err => {
                console.log(err);
                res.status(400).send();
              });
          }
        })
        .catch(err => console.log(err));
    }
  } else {
    res.status(401).send("Wymagana jest autoryzacja");
  }
});

// @route DELETE api/book-user/book/:bookId
// @desc deletes interaction with book for user
// @access Private
router.delete("/book/:bookid", (req, res) => {
  if (req.headers["authorization"]) {
    token = req.headers["authorization"];
    data = jwtUtils.verifyToken(token, req.app.locals.publickey);
    if (data.error) {
      res.status(400).json({ error: data.error });
    } else {
      const { id } = data;
      Book_User.findOne({ where: { userid: id, bookid: req.params.bookid } })
        .then(interaction => {
          if (interaction) {
            interaction
              .destroy()
              .then(res.status(200).send())
              .catch(err => {
                console.log(err);
                res.status(400).send();
              });
          } else {
            res.status(404).send();
          }
        })
        .catch(err => console.log(err));
    }
  } else {
    res.status(401).send("Wymagana jest autoryzacja");
  }
});

module.exports = router;
