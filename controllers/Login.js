const { Cliente, Usuario } = require("../models/Associations"),
    jwt = require('jsonwebtoken');
require('dotenv').config()

const controllers = {}


controllers.login = async (req,res)=>{
    try {
        let body = req.body
        const usuario = await Usuario.findOne({where: {usuario:body.usuario, password:body.password}})
        console.log(usuario)
        if (usuario){
            jwt.sign({id_usuario:usuario.id_usuario}, process.env.SECKEY, {expiresIn: "1d"}, (err, token)=>{
                res.json({
                    token
                })
            })
        } else {
            res.status(404).send({codigo:"002", msg:"El usuario o la contraseña no coinciden"})
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(404)
    }

}

controllers.register = async (req,res)=>{
    try {
        let body = req.body

        const nuevoCliente = await Cliente.create({rut:body.rut, nombre:body.usuario})
        const [usuario, created] = await Usuario.findOrCreate({
            where: { usuario: body.usuario },
            defaults: {
                password:body.password,
                email:body.email,
                rut:body.rut
            }
        });
        console.log(usuario, created)
        if (created) {
            res.json({usuario:usuario.usuario, msg:"Se ha registrado correctamente"})
        } else {
            res.json({msg: 'El usuario ya existe'})
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(404)
    }
}



module.exports = controllers