const express = require('express');

const router = express.Router()


router.use(require('./address.routes'))
router.use(require('./client.routes'))
router.use(require('./dispatch.routes'))
router.use(require('./order.routes'))
router.use(require('./products.routes'))
router.use(require('./session.routes'))
router.use(require('./user.routes'))



module.exports = router