const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(process.env.database, process.env.username, process.env.password, {
  host: process.env.host,
  dialect: 'postgres'
});

module.exports = sequelize;