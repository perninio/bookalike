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
