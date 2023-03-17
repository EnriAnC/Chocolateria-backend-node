const { Usuario } = require("../models/Associations"),
    jwt = require('jsonwebtoken');
require('dotenv').config()

const controllers = {}

controllers.userByToken = async (req, res)=>{
    try {
        const authData = req.authData
        if(!authData) return res.sendStatus(404)
        const id_usuario = authData.id_usuario;
        const cliente = await Usuario.findByPk(id_usuario, {attributes:['email']})
        if (!cliente) throw {msg:"Usuario no existe"}
        // console.log(cliente)
        res.status(202).json(cliente)
    } catch (error) {
        res.status(404).send(error)
    }
}

module.exports = controllers