const Sequelize = require("sequelize");
const db = require("../config/database");

const Book = require("./Book");
const User = require("./User");

class Books_Users extends Sequelize.Model {}

/*
CREATE TABLE books_users(
PRIMARY KEY(bookid,userid),
bookid INT NOT NULL,
FOREIGN KEY (bookid) REFERENCES books(bookid),
userid INT NOT NULL,
FOREIGN KEY (userid) REFERENCES users(userid),
status INT,
createdat DATE DEFAULT CURRENT_TIMESTAMP,
updatedat DATE DEFAULT CURRENT_TIMESTAMP
);
*/

Books_Users.init(
  {
    bookid: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    userid: {
      type: Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true
    },
    status: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        min: 0,
        max: 7
      }
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
    modelName: "books_user",
    timestamps: false
  }
);

module.exports = Books_Users;
