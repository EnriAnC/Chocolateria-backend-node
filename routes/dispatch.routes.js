const { Router } = require('express'),
    controllers = require('../controllers/dispatch'), 
    { verifyToken, isAuth } = require('../middleware/verifyToken'),
    router = Router();

router.get('/api/dispatch/order/:id', verifyToken, isAuth, controllers.dispatchByOrderId)



module.exports = router