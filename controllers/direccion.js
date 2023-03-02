const { Direccion } = require('../models/Associations')


const controllers = {}


controllers.direccionesPorRut = async (req,res)=>{
    try {
        const data = await Direccion.findAll({where:{rut:req.params.rut}})
        // console.log(data)
        if(data) res.json(data)
        else res.sendStatus(404)
    } catch (error) {
        console.log(error)
    }
}

module.exports = controllers