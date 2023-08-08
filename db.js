// db.js
const { Sequelize } = require('sequelize');
const dbConfig = require("./config/db.config")

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: 'mysql',
  logging: false, // Set to true if you want to see SQL logs during development
});

module.exports = sequelize;