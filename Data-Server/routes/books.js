const express = require("express");
const router = express.Router();

const db = require("../config/database");
const Book = require("../models/Book");

// @route GET api/books/
// @desc get all books
// @access Public
router.get("/", (req, res) => {
  Book.findAll()
    .then(books => {
      if (books) {
        res.status(200).json({ data: books });
      } else {
        res.status(404).json({ Msg: "Nie można znaleźć książek" });
      }
    })
    .catch(err => console.log(err));
});

// @route GET api/books/:bookID
// @desc get all books from certain category
// @access Public
router.get("/:bookID", (req, res) => {
  Book.findOne({ where: { bookid: req.params.bookID } })
    .then(book => {
      if (book) {
        res.status(200).json({ data: book });
      } else {
        res.status(404).json({ Msg: "Nie można znaleźć takiej książki" });
      }
    })
    .catch(err => console.log(err));
});

// @route GET api/books/category/:category
// @desc get all books from certain category
// @access Public
router.get("/category/:category", (req, res) => {
  Book.findAll({ where: { booktype: req.params.category } })
    .then(books => {
      if (books) {
        res.status(200).json({ data: books });
      } else {
        res.status(404).json({ Msg: "Nie można znaleźć takiego typu" });
      }
    })
    .catch(err => console.log(err));
});

module.exports = router;
