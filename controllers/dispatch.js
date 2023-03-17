const { Despacho } = require('../models/Associations')

const controllers = {}

controllers.dispatchByOrderId = async (req,res)=>{
    try {
        if (!req.params.id) throw {msg:"Hace falta el id"}
        const data = await Despacho.findAll({where:{id_orden:req.params.id}})
        if(data) res.json(data)
        else res.sendStatus(404)
    } catch (error) {
        res.status(404).json(error)
    }
}

module.exports = controllers