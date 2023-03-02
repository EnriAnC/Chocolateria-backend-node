const { Sequelize, DataTypes } = require('sequelize')
const { sequelize } = require("../db/sequelize");
const { Cliente } = require('./Cliente');


const Orden = sequelize.define('orden',{
    id_orden:{
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
    id_direccion:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
    precio_total:{
        type: DataTypes.INTEGER,
        allowNull: false
    }

},{
    tableName: "orden",
    timestamps: false
})



module.exports = { Orden }