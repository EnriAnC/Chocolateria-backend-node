const { Sequelize } = require("sequelize");
require('dotenv').config()

const connectionURL = `postgres://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NOMBRE}`

const sequelize = new Sequelize(connectionURL);

(async()=>{
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
        // await sequelize.sync()
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
})()



module.exports = { sequelize }
