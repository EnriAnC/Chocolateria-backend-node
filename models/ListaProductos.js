const { Sequelize, DataTypes } = require('sequelize')
const { sequelize } = require("../db/sequelize");
const { Orden } = require('./Orden');
const { Producto } = require('./Producto');


const ListaProductos = sequelize.define('listaProductos',{
    id_lista:{
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
    id_producto:{
        type: DataTypes.INTEGER,
        references:{
            model: Producto,
            key:'id_producto'
        }
    },
    cantidad_producto:{
        type: DataTypes.INTEGER,
        allowNull: false
    }

},{
    tableName: "lista_productos",
    timestamps: false
})

module.exports = { ListaProductos }