const { Direccion } = require('../models/Associations')


const controllers = {}


controllers.addressByRut = async (req,res)=>{
    try {
        if (!req.params.rut) throw {msg:"Hace falta el rut"}
        const data = await Direccion.findAll({where:{rut:req.params.rut}})
        // console.log(data)
        if(data) res.json(data)
        else res.sendStatus(404)
    } catch (error) {
        console.log(error)
    }
}

module.exports = controllers