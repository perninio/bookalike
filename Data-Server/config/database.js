const Sequelize = require("sequelize");

module.exports = new Sequelize("bookalike", "root", "admin", {
  host: process.env.HOST || "localhost",
  dialect: "mysql",
  logging: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
