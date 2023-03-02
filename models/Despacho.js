const { Sequelize, DataTypes } = require('sequelize')
const { sequelize } = require("../db/sequelize");
const { Direccion } = require('./Direccion');
const { Orden } = require('./Orden');


const Despacho = sequelize.define('despacho',{
    id_despacho:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    id_orden:{
        type: DataTypes.INTEGER,
        references:{
            model: Orden,
            key:'id_orden'
        }
    },
    id_direccion:{
        type: DataTypes.INTEGER,
        references:{
            model: Direccion,
            key:'id_direccion'
        }
    }
},{
    tableName: "despachos",
    timestamps: false
})



module.exports = { Despacho }