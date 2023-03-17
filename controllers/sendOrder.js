const { sequelize } = require('../db/sequelize')
const { Producto, Orden, Despacho, ListaProductos, Usuario } = require('../models/Associations')


const controllers = {}

controllers.sendOrder = async (req,res)=>{
    try {
        const t = await sequelize.transaction()
        if (!t) throw {msg:'Error al crear transacción'}
        try {
            const body = req.body
            //  body = {
            //  "rut": "1234567890",
            //  "id_direccion": 2,
            // "productos": [
            //     {
            //         "id_producto": 2,
            //         "cantidad_producto": 20
            //     },
            //     {
            //         "id_producto": 1,
            //         "cantidad_producto": 30
            //     }
            //  ]
            // }
            console.log(body)
    
            const suma = async(id_producto, cant_prod)=>{
                try {
                    const producto = await Producto.findByPk(Number(id_producto), { transaction: t })
                    // console.log(producto)
                    return producto.precio * cant_prod
                } catch (err) {
                    console.log('Error en la sum de cada producto: ', err)
                    return new Error({msg:'No se ha podido obtener el total de cada cantidad de productos'})
                }
            }
    
            let sum = body.productos.map(async (producto)=>{
                try {
                    return await suma(producto.id_producto, producto.cantidad_producto)
                } catch (err) {
                    console.log('Error en la suma entre todos los productos: ', err)
                }
            })
            const total = await sum.reduce(async (a, b) => await a + await b, 0)
            console.log(total)

            // // INSERT A LA TABLA ORDEN   
            const orden = await Orden.create({rut:body.rut, id_direccion:body.id_direccion, precio_total:total}, { transaction: t })
            // console.log(orden)

            // // INSERT A LA TABLA DESPACHOS
            const despacho = await Despacho.create({id_orden:orden.id_orden, id_direccion:orden.id_direccion}, { transaction: t })
            // console.log(despacho)


            const verificarExistencia = body.productos.map(async p =>{
                try {
                    let producto = await Producto.findByPk(Number(p.id_producto), { transaction: t });
                    console.log(producto.existencias)
                    producto.existencias = producto.existencias - p.cantidad_producto
                    console.log(producto.existencias )
                    if (producto.existencias <= 0) return {msg:"No hay stock suficiente", producto:producto.nombre, existencias:producto.existencias}
                    else {
                        producto.save()
                        return true
                    }
                } catch (err) {
                    return (err)
                    console.log(err.msg)
                }
            })
            let existencia = await Promise.all(verificarExistencia)
            // console.log(existencia)
            existencia = existencia.filter(el=> el !== true)
            // console.log(existencia)
            if (existencia.length > 0) {
                t.rollback()
                res.json(existencia)
                return
            } else {
                let listaProds = body.productos.map(async p=>{
                    return await ListaProductos.create({id_orden:orden.id_orden, id_producto:p.id_producto, cantidad_producto:p.cantidad_producto}, { transaction: t })
                })
                listaProds = await Promise.all(listaProds)
                console.log(listaProds)
                res.json({msg:"Compra Correcta", total:orden.precio_total, ...listaProds})
            }

            t.commit()
        } catch (error) {
            t.rollback()
            console.log(error)
        }
    } catch (err) {
        console.log(err)
        res.sendStatus(404)
    }
    
}





module.exports = controllers