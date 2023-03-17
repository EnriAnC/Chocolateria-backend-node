const { Router } = require('express'),
    controllers = require('../controllers/order'), 
    { verifyToken, isAuth } = require('../middleware/verifyToken'),
    router = Router();

router.get('/api/orders', verifyToken, isAuth, controllers.getOrders)
router.get('/api/orders/rut/:rut', verifyToken, isAuth, controllers.ordersByRut)
router.delete('/api/order/:id', verifyToken, isAuth, controllers.deleteOrderById)
    

module.exports = router