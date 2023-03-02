const { Producto, ListaProductos } = require('../models/Associations')


const controllers = {}

controllers.getProductos = async (req,res)=>{
    try {
       return res.json(await Producto.findAll({order:[['id_producto', 'ASC']]}))
    } catch (error) {
        console.log(error)
        res.status(404)
    }
}
controllers.productoPorId = async (req,res,)=>{
    try {
        const data = await Producto.findByPk(Number(req.params.id))
        if(data) res.json(data)
        else res.sendStatus(404)
    } catch (error) {
        console.log(error)
    }
}

controllers.productosPorOrden = async (req,res)=>{
    try {
        const data = await ListaProductos.findAll({
            where: {id_orden: req.params.id},
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