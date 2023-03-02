const { sequelize } = require('../db/sequelize')
const { Producto, Orden, ListaProductos } = require('../models/Associations')


const controllers = {}


controllers.getOrdenes = async (req,res)=>{
    try {
       return res.json(await Orden.findAll({order:[['id_orden', 'ASC']]}))
    } catch (error) {
        console.log(error)
        res.status(404)
    }
}
controllers.ordenesPorRut = async (req,res)=>{
    try {
        const data = await Orden.findAll({ where: {rut: req.params.rut} })
        if(data) res.json(data)
        else res.sendStatus(404)
    } catch (error) {
        console.log(error)
    }
}
controllers.deleteOrdenPorId = async (req,res)=>{
    try {
        const t = await sequelize.transaction()
        if (!t) throw {msg:'Error al crear transacción'}
        try {
            let OrdenYProductos = await Orden.findAll({
                where: {id_orden: +req.params.id},
                include: [
                    {
                        model: ListaProductos,
                        required: true
                    }
                ],  
            }, { transaction: t })
            let listaProductos = OrdenYProductos[0].listaProductos.map(lp=>{
                return {id_producto: lp.id_producto, cantidad_producto: lp.cantidad_producto}
            })

            let productosDevueltos = listaProductos.map(async lp=>{
                try {
                    return await Producto.increment(
                        {existencias: lp.cantidad_producto}, 
                        {where:{id_producto:lp.id_producto}
                    }, { transaction: t })
                } catch (err) {
                    console.log('Error en update lista_productos: ', err)
                }
            })
            productosDevueltos = await Promise.all(productosDevueltos)
            const data = await Orden.destroy(
                {where:{id_orden: Number(req.params.id)}}
            , { transaction: t })
            t.commit()
            if(data) res.json(productosDevueltos)
            else res.sendStatus(404)
        } catch (error) {
            t.rollback()
            res.sendStatus(404)
            console.log(error)
        } finally {
            
        }

    } catch (err) {
        console.log(err)
        res.sendStatus(404)
        
    }
    
}

module.exports = controllers