const express = require("express");
const router = express.Router();

const db = require("../config/database");
const Book = require("../models/Book");
const jwtUtils = require("../utils/jwtUtils");
const bookUtils = require("../utils/booksUtils");
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
        books = book.similar_books.split(",");
        bookUtils
          .getSimilarBooks(books)
          .then(books =>
            res.status(200).json({ data: { book: book, similar_books: books } })
          )
          .catch(err => console.log(err));
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

// @route POST api/books/set-recommendations
// @desc recieve book recommendations from RS and put them in database
// @access Server
router.post("/set-recommendations", (req, res) => {
  if (req.headers["authorization"]) {
    token = req.headers["authorization"];
    data = jwtUtils.verifyToken(token, req.app.locals.publickey);
    if (data.error) {
      res.status(400).send();
    } else {
      if (data.role == "server" && data.id == "RS") {
        res.status(200).send("Git");
        books = req.body.books;

        for (let i = 1; i <= Object.keys(books).length; i++) {
          Book.update({ similar_books: books[i] }, { where: { bookid: i } });
        }
      } else {
        res.status(403).send("Nie serwer");
      }
    }
  } else {
    res.status(401).send("Wymagana jest autoryzacja");
  }
});

module.exports = router;
