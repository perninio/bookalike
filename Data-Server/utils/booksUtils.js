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

async function getRecommendedBooks(predictions) {
  return await Promise.all(
    predictions.map(prediction => {
      return getRecommendedBook(prediction);
    })
  );
}

async function getRecommendedBook(prediction) {
  const splitted = prediction.split(":");
  const score = splitted[0];
  const bookid = splitted[1];
  return await Book.findOne({ where: { bookid: parseInt(bookid) } })
    .then(book => {
      return {
        bookid: book.bookid,
        name: book.name,
        graphic: book.graphic,
        author: book.author,
        score: score,
        percentage: score * 20
      };
    })
    .catch(err => console.log(err));
}

module.exports = { getSimilarBooks, getRecommendedBooks };
