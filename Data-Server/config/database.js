const Sequelize = require("sequelize");

module.exports = new Sequelize("bookalike", "postgres", "postgres", {
  host: process.env.DS_DB_IP_ADDR || "localhost",
  dialect: "postgres",
  logging: false,

  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
