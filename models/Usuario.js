const { DataTypes } = require('sequelize')
const { sequelize } = require("../db/sequelize");

const Usuario = sequelize.define('usuario',{
    id_usuario:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    usuario:{
        type: DataTypes.STRING(30),
        allowNull: false
    },
    email:{
        type: DataTypes.STRING(30),
        allowNull: false
    },
    password:{
        type: DataTypes.STRING(30),
        allowNull: false
    },

},{
    tableName: "usuarios",
    timestamps: false
})


module.exports = { Usuario }