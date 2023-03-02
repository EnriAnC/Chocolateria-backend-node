const { Cliente } = require('../models/Associations'),
    jwt = require('jsonwebtoken');
require('dotenv').config()

const controllers = {}



controllers.getClientes = async (req,res)=>{
    try {
       return res.json(await Cliente.findAll())
    } catch (error) {
        console.log(error)
        res.status(404)
    }
}
controllers.clientesPorRut = async (req,res)=>{
    try {
        const data = await Cliente.findByPk(req.params.rut)
        if(data) res.json(data)
        else res.sendStatus(404)
    } catch (error) {
        console.log(error)
    }
}
controllers.deleteDataClientePorRut= async (req,res)=>{
    try {
        const data = await Cliente.destroy({where:{rut:req.params.rut}})
        if(data) res.json(data)
        else res.sendStatus(404)
    } catch (error) {
        console.log(error)
    }
}
controllers.putCliente = async (req, res)=>{
    try {
        const cliente = await Cliente.findByPk(req.params.rut)
        console.log(cliente)
        if (!cliente) throw { msg:"No existe el usuario" }
        const { nombre } = req.body
        console.log(req.body)
        if (!nombre) throw { msg:"No hay parametro nombre" }
        cliente.nombre = nombre
        cliente.save()
        res.status(202).json({msg: 'Actualizado con éxito', nombreNuevo: cliente.nombre})
        
    } catch (error) {
        console.log(error.msg)
        res.status(404).send(error.msg)
    }
}
controllers.clientePorId = async (req, res)=>{
    try {
        const authData = jwt.verify(req.token, process.env.SECKEY)
        // console.log(authData)
        if(!authData) return res.sendStatus(404)
        const id_usuario = authData.id_usuario;
        const cliente = await Cliente.findOne({where:{id_usuario}})
        console.log(cliente)
        res.status(202).json(cliente)
    } catch (error) {
        res.status(404).send(error)
    }
}

module.exports = controllers