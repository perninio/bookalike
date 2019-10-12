const Sequelize = require("sequelize");
const db = require("../config/database");

class Book extends Sequelize.Model {}

Book.init(
  {
    BookID: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    Name: {
      type: Sequelize.STRING,
      allowNull: false
    },
    "Publishing-house": {
      type: Sequelize.STRING
    },
    Year: {
      type: Sequelize.STRING
    },
    BookType: {
      type: Sequelize.STRING
    },
    Description: {
      type: Sequelize.STRING
    },
    Graphic: {
      type: Sequelize.STRING
    },
    createdAt: {
      type: Sequelize.DATE
    },
    updatedAt: {
      type: Sequelize.DATE
    }
  },
  {
    sequelize: db,
    modelName: "book"
  }
);

module.exports = Book;
