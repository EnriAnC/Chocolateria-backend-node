const { Router } = require('express'),
    controllers = require('../controllers/client'),    
    { verifyToken, isAuth } = require('../middleware/verifyToken'),
    router = Router();

router.get('/api/clients', controllers.getClient)
router.get('/api/client', verifyToken, isAuth, controllers.clientByToken)
router.route('/api/client/rut/:rut')
    .get(verifyToken, isAuth, controllers.clientByRut)
    .delete(verifyToken, isAuth, controllers.deleteDataClientByRut)
    .put(verifyToken, isAuth, controllers.putClient)
router.get('/api/client/orders/:rut', verifyToken, isAuth, controllers.infoOrdersAndDispatchs)


module.exports = router