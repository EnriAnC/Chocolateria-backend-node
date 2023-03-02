const { Sequelize, DataTypes } = require('sequelize')
const { sequelize } = require("../db/sequelize");
const { Usuario } = require('./Usuario');


const Cliente = sequelize.define('clientes',{
    rut:{
        type: DataTypes.STRING(10),
        primaryKey: true,
    },
    nombre:{
        type: DataTypes.STRING(50),
        allowNull: false
    },
    id_usuario:{
        type: DataTypes.INTEGER,
        references:{
            model: Usuario,
            key:'id_usuario'
        }
    },

},{
    tableName: "clientes",
    timestamps: false
})

Cliente.añadirCliente = async ({rut, nombre}) =>{
    try {
        return await Cliente.create({rut, nombre})
    } catch (error) {
        return {msg:error.message}
    }
} 



module.exports = {Cliente}