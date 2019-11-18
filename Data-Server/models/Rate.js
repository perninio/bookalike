const Sequelize = require("sequelize");
const db = require("../config/database");

class Rate extends Sequelize.Model {}

Rate.init(
  {
    ratesid: {
      type: Sequelize.INTEGER,
      autoIncrement: true,
      primaryKey: true
    },
    userid: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    bookid: {
      type: Sequelize.INTEGER,
      allowNull: false
    },
    rate: {
      type: Sequelize.INTEGER,
      allowNull: false,
      validate: {
        min: 1,
        max: 5
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
    modelName: "rate",
    timestamps: false
  }
);

module.exports = Rate;
