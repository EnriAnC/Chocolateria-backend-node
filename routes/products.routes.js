const { Router } = require('express'),
    controllers = require('../controllers/product'), 
    { verifyToken, isAuth } = require('../middleware/verifyToken'),
    multer = require("../config/multer"),
    router = Router();

router.route('/api/product')
    .post(multer.single("img"), verifyToken, isAuth, controllers.postProduct)
    .put(verifyToken, isAuth, controllers.putProduct)
    
    router.get('/api/products', controllers.getProducts)
router.route('/api/products/product/:id') 
    .get(controllers.productById)
    .delete(verifyToken, isAuth, controllers.deleteById)
router.route('/api/products/order/:id')
    .get(verifyToken, isAuth, controllers.productsByOrderId)


module.exports = router