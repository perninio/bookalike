const Sequelize = require("sequelize");
const db = require("../config/database");

const Book_User = require("./Book_User");

class User extends Sequelize.Model {}

User.init(
  {
    userid: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    status: {
      type: Sequelize.STRING
    },
    firstname: {
      type: Sequelize.STRING
    },
    lastname: {
      type: Sequelize.STRING
    },
    birthdate: {
      type: Sequelize.DATE
    },
    description: {
      type: Sequelize.STRING
    },
    graphic: {
      type: Sequelize.STRING
    }
  },
  {
    sequelize: db,
    modelName: "user",
    timestamps: false
  }
);

User.hasMany(Book_User, { as: "rates" });

module.exports = User;
