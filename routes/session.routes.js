const { Router } = require('express'),
    { login, register } = require('../controllers/session'),
    router = Router();

router.route("/login")
    .post(login)

router.route("/register")
    .post(register)


module.exports = router