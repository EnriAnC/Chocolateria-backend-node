const { Producto, ListaProductos } = require('../models/Associations')
const cloudinary = require("../config/cloudinary");

const controllers = {}

controllers.getProducts = async (req,res)=>{
    try {
       return res.json(await Producto.findAll({order:[['id_producto', 'ASC']]}))
    } catch (error) {
        console.log(error)
        res.status(404)
    }
}
controllers.postProduct = async (req,res)=>{
    try {
        const { nombre, precio, existencias } = req.body
        if (!nombre) throw {nombre:"Falta nombre de producto"}
        if (!precio) throw {nombre:"Falta precio de producto"}
        if (!existencias) throw {nombre:"Falta existencias de producto"}
        const img = await cloudinary.uploader.upload(req.file.path);
        const producto = await Producto.create({
            nombre,
            precio,
            existencias,
            img: img.secure_url
        })
        if (producto) res.json(producto)
    } catch (error) {
        console.log(error)
        res.status(404)
    }
}
controllers.putProduct = async (req,res)=>{
    try {
        const { id_producto } = req.body
        console.log(req.body)
        if (!req.body.hasOwnProperty("nombre")) console.log({nombre:"Falta nombre de producto"}) 
        else {
            const update1 = await Producto.update({
                nombre:req.body.nombre,
            }, {where:{id_producto}})
            res.status(200).json({nombre:req.body.nombre})
        }
        if (!req.body.hasOwnProperty("precio")) console.log({precio:"Falta precio de producto"})
        else {
            const update2 = await Producto.update({
                precio:req.body.precio,
            }, {where:{id_producto}})
            res.status(200).json({ precio:req.body.precio})
        }
        if (!req.body.hasOwnProperty("existencias")) console.log({existencias:"Falta existencias de producto"})
        else {
            const update3 = await Producto.update({
                existencias:req.body.existencias,
            }, {where:{id_producto}})
            res.status(200).json({existencias:req.body.existencias})
        }
    } catch (error) {
        console.log(error)
        res.status(404)
    }
}

controllers.productById = async (req,res,)=>{
    try {
        const data = await Producto.findByPk(Number(req.params.id))
        if(data) res.json(data)
        else res.sendStatus(404)
    } catch (error) {
        console.log(error)
    }
}
controllers.deleteById = async (req,res,)=>{
    try {
        const data = await Producto.destroy({where:{id_producto:Number(req.params.id)}})
        console.log(data)
        if(data) res.json(data)
        else res.sendStatus(404)
    } catch (error) {
        console.log(error)
    }
}



controllers.productsByOrderId = async (req,res)=>{
    try {
        const id_orden = req.params.id
        if (!id_orden) throw {msg:"Falta el parametro id"}
        const data = await ListaProductos.findAll({
            where: {id_orden},
            include: [
                {
                    model: Producto,
                    required: true
                }
            ],           
        })
        if(data) res.json(data)
        else res.sendStatus(404)
    } catch (error) {
        console.log(error)
    }
}

module.exports = controllers