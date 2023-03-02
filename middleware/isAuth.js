const isAuth = {}

// Authorization: Bearer <token>
isAuth.verifyToken = (req, res, next)=>{
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


module.exports = isAuth