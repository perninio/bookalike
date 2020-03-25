const Sequelize = require("sequelize");
const db = require("../config/database");

class Books_Users extends Sequelize.Model {}

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
    wants_read: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    has_book: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
    },
    has_read: {
      type: Sequelize.BOOLEAN,
      defaultValue: false
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
