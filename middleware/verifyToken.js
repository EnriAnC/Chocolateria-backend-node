const jwt = require('jsonwebtoken');

const verify = {}

verify.isAuth = async (req, res, next)=>{
    try {
        const authData = jwt.verify(req.token, process.env.SECKEY)
        if(!authData) throw {msg:"Token expirado"}
        req.authData = authData
        next()
    } catch (error) {
        console.log(error)
        res.status(404).send(error)
    }
}

// Authorization: Bearer <token>
verify.verifyToken = (req, res, next)=>{
    try {
        const bearerHeader = req.headers['authorization'];
        if (typeof bearerHeader != 'undefined'){
            const bearerToken = bearerHeader.split(" ")[1]
            req.token = bearerToken
            next()
        } else {
            res.sendStatus(403)
        }
    } catch (error) {
        console.log(error)
        res.sendStatus(403)
    }
}

module.exports = verify 