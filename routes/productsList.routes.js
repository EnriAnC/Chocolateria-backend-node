const { Router } = require('express'),
    controllers = require('../controllers/sendOrder'), 
    { verifyToken, isAuth } = require('../middleware/verifyToken'),
    router = Router();

router.post('/api/send/order', verifyToken, isAuth, controllers.sendOrder)


module.exports = router