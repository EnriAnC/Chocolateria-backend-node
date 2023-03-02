const { Sequelize, DataTypes } = require('sequelize')
const { sequelize } = require("../db/sequelize");


const Producto = sequelize.define('producto',{
    id_producto:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre:{
        type: DataTypes.STRING(200),
        allowNull: false
    },
    precio:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    existencias:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    img:{
        type: DataTypes.STRING(100),
        allowNull: false
    }

},{
    tableName: "productos",
    timestamps: false
})



module.exports = { Producto }