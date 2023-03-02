const { Despacho } = require('../models/Associations')

const controllers = {}

controllers.despachosPorOrden = async (req,res)=>{
    try {
        const data = await Despacho.findAll({where:{id_orden:req.params.id}})
        if(data) res.json(data)
        else res.sendStatus(404)
    } catch (error) {
        console.log(error)
    }
}

module.exports = controllers