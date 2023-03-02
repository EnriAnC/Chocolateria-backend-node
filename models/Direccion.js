const { Sequelize, DataTypes } = require('sequelize')
const { sequelize } = require("../db/sequelize");
const { Cliente } = require('./Cliente');


const Direccion = sequelize.define('direccion',{
    id_direccion:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    rut:{
        type: DataTypes.STRING(10),
        references:{
            model: Cliente,
            key:'rut'
        }
    },
    direccion:{
        type: DataTypes.STRING(200),
        allowNull: false
    },


},{
    tableName: "direcciones",
    timestamps: false
})



module.exports = { Direccion }