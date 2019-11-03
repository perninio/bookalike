const Book = require("../models/Book");

async function getSimilarBooks(books) {
  return await Promise.all(books.map(bookid => getBook(bookid)));
}

async function getBook(bookid) {
  return await Book.findOne({ where: { bookid: bookid } })
    .then(book => {
      return book;
    })
    .catch(err => console.log(err));
}

module.exports = { getSimilarBooks };
