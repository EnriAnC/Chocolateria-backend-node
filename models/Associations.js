const { Cliente } = require('./Cliente')
const { Producto } = require('./Producto')
const { Orden } = require('./Orden')
const { Direccion } = require('./Direccion')
const { Despacho } = require('./Despacho')
const { ListaProductos } = require('./ListaProductos')
const { Usuario } = require('./Usuario')
// ----RELACIÓN MUCHOS A MUCHOS (N:M) ENTRE PRODUCTOS Y ORDEN
Producto.hasMany(ListaProductos, {
    foreignKey: 'id_producto',
    targetKey: 'id_producto'
})
ListaProductos.belongsTo(Producto, {
    foreignKey: 'id_producto',
    targetKey: 'id_producto'
})

Orden.hasMany(ListaProductos, {
    foreignKey: 'id_orden',
    targetKey: 'id_orden'
})
ListaProductos.belongsTo(Orden, {
    foreignKey: 'id_orden',
    targetKey: 'id_orden'
})
// ----------------------------------

// ----RELACIÓN UNO A UNO (1:1) ENTRE DESPACHO Y ORDEN
// Despacho.hasOne(Orden)
Orden.hasOne(Despacho,{
    foreignKey: 'id_orden',
    targetKey: 'id_orden'
})
// --------------------------------

// ------RELACION UNO A MUCHOS (1:N) ENTRE ORDEN Y CLIENTE
Cliente.hasMany(Orden,{
    foreignKey: 'id_orden',
    targetKey: 'id_orden'
})
// Orden.belongsTo(Cliente)
// --------------------------------

// -------RELACIÓN UNO A MUCHOS (1:N) ENTRE DIRECCION Y CLIENTE
Cliente.hasMany(Direccion,{
    foreignKey: 'rut',
    targetKey: 'rut'
})
// Direccion.belongsTo(Cliente)
// --------------------------------
// -------RELACIÓN UNO A MUCHOS (1:N) ENTRE DIRECCION Y ORDEN
Direccion.hasMany(Orden,{
    foreignKey: 'id_direccion',
    targetKey: 'id_direccion'
})
// Direccion.belongsTo(Cliente)
// --------------------------------

// -------RELACIÓN UNO A MUCHO (1:N) ENTRE DESPACHO Y DIRECCION
Direccion.hasMany(Despacho,{
    foreignKey: 'id_direccion',
    targetKey: 'id_direccion'
})
// Despacho.belongsTo(Direccion)
// --------------------------------



module.exports =  { Cliente, Producto, Orden, Direccion, Despacho, ListaProductos, Usuario }