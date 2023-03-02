const express = require('express');
const controllersCompra = require('../controllers/ordenDeCompra')
const controllersCliente = require('../controllers/cliente')
const controllersProducto = require('../controllers/producto')
const controllersOrden = require('../controllers/orden')
const controllersDireccion = require('../controllers/direccion')
const controllersDespacho = require('../controllers/despacho')
const router = express.Router()
const { verifyToken } = require('../middleware/isAuth');
const { login, register } = require('../controllers/Login');

//---------------------------------------------------------

router.get('/api/clientes', controllersCliente.getClientes)
router.route('/api/clientes/rut/:rut')
    .get(controllersCliente.clientesPorRut)
    .delete(controllersCliente.deleteDataClientePorRut)
    .put(controllersCliente.putCliente)



router.get('/api/productos', controllersProducto.getProductos)
router.get('/api/productos/producto/:id', controllersProducto.productoPorId)
router.route('/api/productos/orden/:id')
    .get(controllersProducto.productosPorOrden)
    .delete(controllersOrden.deleteOrdenPorId)

router.get('/api/ordenes', controllersOrden.getOrdenes)
router.get('/api/ordenes/rut/:rut', controllersOrden.ordenesPorRut)

router.route('/api/producto')
    .post()
    .delete()

router.route('/api/direcciones/rut/:rut')
    .get(controllersDireccion.direccionesPorRut)
    .put()
// router.post('/api/direcciones/:rut/:direccion', controllers.direccionesPorRut)

router.get('/api/despachos/orden/:id', controllersDespacho.despachosPorOrden)


router.post('/api/compra/orden', controllersCompra.ordenDeCompra)



// router.get('/api/usuario/:id', controllers.usuarioPorId)
router.get('/api/usuario/cliente', verifyToken, controllersCliente.clientePorId)

// ------LOGIN Y REGISTRO-----
router.route("/login")
    .post(login)

router.route("/register")
    .post(register)


module.exports = router