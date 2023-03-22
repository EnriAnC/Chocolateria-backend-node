const { Sequelize } = require("sequelize");
require('dotenv').config()

const connectionURL = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NOMBRE}`

const sequelize = new Sequelize(connectionURL, {pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }});




module.exports = { sequelize }
