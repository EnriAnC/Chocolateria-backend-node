const { Router } = require('express'),
    controllers = require('../controllers/address'),
    { verifyToken, isAuth } = require('../middleware/verifyToken'),
    router = Router();

router.route('/api/address/rut/:rut')
    .get(verifyToken, isAuth, controllers.addressByRut)
    .put()


module.exports = router