const Sequelize = require("sequelize");
const db = require("../config/database");

const Book_User = require("./Book_User");

class Book extends Sequelize.Model {}

Book.init(
  {
    bookid: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    publishinghouse: {
      type: Sequelize.STRING
    },
    author: {
      type: Sequelize.STRING
    },
    year: {
      type: Sequelize.STRING
    },
    booktype: {
      type: Sequelize.STRING
    },
    description: {
      type: Sequelize.STRING
    },
    similar_books: {
      type: Sequelize.STRING
    },
    graphic: {
      type: Sequelize.STRING
    },
    createdat: {
      type: Sequelize.DATE
    },
    updatedat: {
      type: Sequelize.DATE
    }
  },
  {
    sequelize: db,
    modelName: "book",
    timestamps: false
  }
);

Book.hasMany(Book_User, { as: "rates" });

module.exports = Book;
