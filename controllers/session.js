const { Usuario } = require("../models/Associations"),
    jwt = require('jsonwebtoken');
    bcrypt = require('bcrypt');

require('dotenv').config()

const controllers = {}


controllers.login = async (req,res)=>{
    try {
        let { usuario, password } = req.body
        if (!usuario) throw {msg:"Hace falta el usuario"}
        if (!password) throw {msg:"Hace falta el password"}
        const session = await Usuario.findOne({where: {usuario}})
        console.log(await bcrypt.hash(password, 10))
        const isValid = await bcrypt.compare(password, session.password)
        if (isValid){
            jwt.sign({id_usuario:session.id_usuario}, process.env.SECKEY, {expiresIn: "1d"}, (err, token)=>{
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
        // console.log(req)
        let { usuario, password, email } = req.body

        if (!usuario) return res.status(404).send({msg:"Falta usuario"})
        const existeUsuario = await Usuario.findOne({where:{usuario}})
        if (existeUsuario) return res.status(401).send({msg: "El usuario ya existe", code:600})

        if (!email) return res.status(404).send({msg:"Falta email"})
        const existeEmail = await Usuario.findOne({where:{email}})
        if (existeEmail) return res.status(401).send({msg: "El email ya se encuentra registrado", code:601})

        if (!password) return res.status(404).send({msg:"Falta password"})
        
        const [nuevousuario, created] = await Usuario.findOrCreate({
            where: { usuario },
            defaults: {
                usuario,
                password: await bcrypt.hash(password, 10),
                email
            },
                
        });
        console.log(nuevousuario, created)
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