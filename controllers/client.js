const { Cliente, Direccion, Orden, ListaProductos, Producto } = require('../models/Associations'),
    jwt = require('jsonwebtoken');
require('dotenv').config()

const controllers = {}



controllers.getClient = async (req,res)=>{
    try {
       return res.json(await Cliente.findAll())
    } catch (error) {
        console.log(error)
        res.status(404)
    }
}
controllers.clientByRut = async (req,res)=>{
    try {
        if (!req.params.rut) throw {msg:"Hace falta el rut"}
        const data = await Cliente.findByPk(req.params.rut)
        if(data) res.json(data)
        else res.sendStatus(404)
    } catch (error) {
        res.status(404).json(error)
    }
}
controllers.deleteDataClientByRut= async (req,res)=>{
    try {
        if (!req.params.rut) throw {msg:"Hace falta el rut"}
        const data = await Cliente.destroy({where:{rut:req.params.rut}})
        if(data) res.json(data)
        else res.sendStatus(404)
    } catch (error) {
        res.status(404).json(error)
    }
}
controllers.putClient = async (req, res)=>{
    try {
        if (!req.params.rut) throw {msg:"Hace falta el rut"}
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
controllers.clientByToken = async (req, res)=>{
    try {
        const authData = req.authData
        if(!authData) return res.sendStatus(404)
        const id_usuario = authData.id_usuario;
        const cliente = await Cliente.findOne({where:{id_usuario}})
        console.log(cliente)
        res.status(202).json(cliente)
    } catch (error) {
        res.status(404).json(error)
    }
}

controllers.infoOrdersAndDispatchs = async (req, res)=> {
    try {
        // const authData = jwt.verify(req.token, process.env.SECKEY)
        // if(!authData) return res.sendStatus(404)
        const rut = req.params.rut
        console.log(rut)
        const data = await Cliente.findAll({
            where: {rut},
            attributes:['rut', 'nombre'],
            include: [
                {
                    model: Direccion,
                    required: true,
                    attributes:['direccion'],
                    include: [
                        {
                            model: Orden,
                            required: true,
                            attributes:['id_orden'],
                            include: [
                                {
                                    model: ListaProductos,
                                    required: true,
                                    attributes:['id_lista', 'cantidad_producto'],
                                    include: [
                                        {
                                            model: Producto,
                                            required: true,
                                            attributes:['nombre', 'precio'],
                                        }
                                    ],  
                                }
                            ],  
                        }
                    ],  
                }
            ], 
        })
        console.log(data)
        if (!data) throw {msg:"Usuario no existe"}
        // console.log(cliente)
        res.status(202).json(data)
    } catch (error) {
        res.status(404).send(error)
    }
}

module.exports = controllers