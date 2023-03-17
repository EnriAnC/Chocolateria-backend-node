const express = require('express');
const app = express();
const cors = require('cors')
require('dotenv').config({path: '.env'})

require('./db/sequelize')
app.use(cors())
app.use(express.json())
// app.use(express.urlencoded({extended: true}))
app.use(require('./routes/routes'))

app.listen(process.env.PORT, ()=>{
    console.log('Escuchando desde el puerto '+process.env.PORT)
})

module.exports = app